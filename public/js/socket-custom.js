var socket = io();
socket.on('connect', function () {
    console.log("conectado al servidor")
    // listarTickets();
});

socket.on('disconnect', function () {
    console.log("Desconectado del servidor")
})
// emitir tickets

var motivo = document.getElementById("motivo");

motivo.addEventListener("keypress", agregarTickets);
function agregarTickets(e) {
    var motivo = document.getElementById("motivo").value;
   
    if ( e == undefined||e.keyCode == 13 ) {
        if (motivo.length >= 1) {
            socket.emit("ticket", {
                createAt: new Date().toISOString(),
                motivo: motivo
            }, function (res) {
                console.log("mensaje recibido", res);
                listarTickets();
            })
        }
    }

}
// seleccionar un tickets y cambiar el estado y actualiza la lista
// listar tickets

const tomarticket = (e) => {
    console.log(e);
    var id = e.parentElement.parentElement.id;
    console.log(id);
    socket.emit('tomarTickets', {
        id
    }, (res) => {
        console.log(res);
    })

}
socket.on('listaTickets', (tickets) => {
    // console.log(res);
    document.getElementById("preload").classList.remove("d-none")

    document.getElementById("preload").display = 'inline-flex';
    document.getElementById("boxlist").innerHTML = null;

    var box = document.getElementById("boxlist");

    var ul = document.createElement("ul");
    for (let i = 0; i < tickets.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("id", tickets[i].id);
        li.setAttribute("class", "list-group-item");
        let icono = tickets[i].estado === 'Espera' ? '<i  style="color:red" class="fa fa-clock-o" aria-hidden="true"></i>' : '<i style="color:green" class="fa fa-check-circle-o" aria-hidden="true"></i>';
        li.innerHTML = `<div class="ticket"><div>${tickets[i].motivo}</div><button class="btn" onclick="tomarticket(this)" ${tickets[i].estado == 'Espera' ? '' : 'disabled'}>${icono}</button></div>`;

        ul.setAttribute("class", "list-group");
        ul.appendChild(li)
    }
    box.appendChild(ul);
    document.getElementById("preload").classList.add("d-none");


    document.getElementById("motivo").value = "";
})

socket.on('listaTicketsAtendidos', (tickets) => {
   
    var listTicket = document.getElementById("ticketsAtendidos");
    listTicket.innerHTML = null;

    var div = document.createElement("div");
    div.classList.add("ticketsAtendido");
    for (let i = 0; i < tickets.length; i++) {
        let d = document.createElement("div");
        d.classList.add("ticket-atendido");
        var strong = document.createElement("strong");
        strong.innerText = `${tickets[i].motivo} - ${tickets[i].estado}`;
        d.appendChild(strong);

        div.appendChild(d);
    }
    listTicket.appendChild(div);
})
