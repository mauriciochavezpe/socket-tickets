var socket = io();
socket.on('connect', function () {
    console.log("conectado al servidor")
    // listarTickets();
});

socket.on('disconnect', function () {
    console.log("Desconectado del servidor")
})
// emitir tickets

function agregarTickets() {

    socket.emit("ticket", {
        // mensaje: `Ticket `,
        createAt: new Date().toISOString(),
        "motivo": document.getElementById("motivo").value
    }, function (res) {
        console.log("mensaje recibido", res);
        listarTickets();
    })
}
// seleccionar un tickets y cambiar el estado y actualiza la lista
// listar tickets
socket.on('tomarTickets', tickets = {}, (res) => {
    console.log(res)
})
const tomarticket = (e) => {
    console.log(e);
    var id = e.parentElement.parentElement.id;
    socket.emit('tomarTickets', {
        id
    }, (res) => {
        console.log(res);
    })

}
socket.on('listaTickets', (res) => {

    document.getElementById("preload").classList.remove("d-none")

    document.getElementById("preload").display = 'inline-flex';
    document.getElementById("boxlist").innerHTML = null;

    var box = document.getElementById("boxlist");


    // console.log(data);
    console.log("la lista", res)
    // res.tickets
    var ul = document.createElement("ul");
    for (let i = 0; i < res.tickets.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("id", res.tickets[i].id);
        li.setAttribute("class", "list-group-item");
        let icono = res.tickets[i].estado === 'Espera' ? '<i  style="color:red" class="fa fa-clock-o" aria-hidden="true"></i>' : '<i style="color:green" class="fa fa-check-circle-o" aria-hidden="true"></i>';
        li.innerHTML = `<div class="ticket"><div>${res.tickets[i].motivo}</div><button class="btn" onclick="tomarticket(this)" ${res.tickets[i].estado =='Espera'?'':'disabled'}>${icono}</button></div>`;

        // li.setAttribute("id",res.tickets[i].id);
        ul.setAttribute("class", "list-group");
        ul.appendChild(li)
    }
    box.appendChild(ul);
    document.getElementById("preload").classList.add("d-none");

    
    document.getElementById("motivo").value = "";
})
// listar tickets
const listarTickets = () => {
    document.getElementById("preload").classList.remove("d-none")

    document.getElementById("preload").display = 'inline-flex';
    document.getElementById("boxlist").innerHTML = null;

    var box = document.getElementById("boxlist");

    socket.on('listaTickets', (res) => {
        console.log("la lista", res)
        // res.tickets
        var ul = document.createElement("ul");
        for (let i = 0; i < res.tickets.length; i++) {
            var li = document.createElement("li");
            li.setAttribute("id", res.tickets[i].id);
            li.setAttribute("class", "list-group-item");
            let icono = res.tickets[i].estado === 'Espera' ? '<i  style="color:red" class="fa fa-clock-o" aria-hidden="true"></i>' : '<i style="color:green" class="fa fa-check-circle-o" aria-hidden="true"></i>';
            li.innerHTML = `<div class="ticket"><div>${res.tickets[i].motivo}</div><button class="btn" onclick="tomarticket(this)" ${res.tickets[i].estado =='Espera'?'':'disabled'}>${icono}</button></div>`;

            // li.setAttribute("id",res.tickets[i].id);
            ul.setAttribute("class", "list-group");
            ul.appendChild(li)
        }
        box.appendChild(ul);
        document.getElementById("preload").classList.add("d-none");
    })
    document.getElementById("motivo").value = "";
}
// socket.on("ticket", function (res) {
//     console.log("mensaje recibido", res);
// })