const socketIO = require('socket.io');
const dbTickets = require('../json/db.json');
const fs = require('fs');

dbTickets.fecha = new Date().getDate();


const socket = (server) => {
    const io = socketIO(server);
    io.on('connection', (client) => {
        // dbTickets.tickets
        client.emit('listaTickets',dbTickets);

        client.on('disconnect', () => {
            console.log(`Usuario desconectado`);
        })
        // listening(name,body,callback) 
        client.on('ticket', (msg, callback) => {

            (dbTickets.tickets.length === 0) ? msg.id = 1: msg.id = dbTickets.tickets[dbTickets.tickets.length - 1].id + 1;
            msg.estado = "Espera"

            dbTickets.tickets.push(msg);
            fs.writeFileSync(__dirname + "./../json/db.json", JSON.stringify(dbTickets))
            callback({
                menssage: `Ticket # ${msg.id}`
            })
            
            // client.broadcast.emit("mensaje", msg);

        })
        // cambia el estado del ticket
        client.on('tomarTickets', (__tickets, callback) => {
            console.log(__tickets)
            dbTickets.tickets.filter((ticket) => {
                console.log(ticket.id)
                if (ticket.id == Number(__tickets.id)) {
                    console.log(ticket);
                    ticket.estado = "Atendido"
                 
                }
            })

        })

       
    })
}

module.exports = socket;