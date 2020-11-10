const socketIO = require('socket.io');
const dbTickets = require('../json/db.json');
const fs = require('fs');
var TicketCola = require('../classes/TicketsCola');

// dbTickets.fecha = new Date().getDate();

var ticketCola = new TicketCola();
// console.log(ticketCola.listTicket().length);
// console.log(ticketCola.getUltimos4().length);

const socket = (server) => {
    const io = socketIO(server);
    io.on('connection', (client) => {

        client.emit('listaTickets', ticketCola.listTicket());
        client.emit('listaTicketsAtendidos', ticketCola.getUltimos4());


        client.on('disconnect', () => {
            console.log(`Usuario desconectado`);
        })
        // listening(name,body,callback) 
        client.on('ticket', (msg, callback) => {    

            msg.id = ticketCola.getId();

            var estado = ticketCola.save(msg);

            if (estado != null || estado != undefined) {
                client.broadcast.emit("listaTickets", dbTickets);
            }

        })
        // cambia el estado del ticket
        client.on('tomarTickets', (ticket, callback) => {
    
            var ticketCola = new TicketCola();
            ticketCola.update(ticket);

            client.broadcast.emit("listaTickets", dbTickets);
           
        })


    })
}

module.exports = socket;