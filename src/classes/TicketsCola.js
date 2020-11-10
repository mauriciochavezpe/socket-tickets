const dbTickets = require('../json/db.json');
const Ticket = require('./Ticket');
const fs = require('fs');
var ticket = null;

class TicketCola {
    constructor() {
        this.fecha = dbTickets.fecha;
        this.tickets = dbTickets.tickets;
        this.ticketsAtendidos = dbTickets.ticketsAtendidos;
    }
    save(obj) {
        if (obj.createAt && obj.motivo) {
            ticket = new Ticket(obj)
            ticket.crearTicket();
        } else {
            return `Error al momento de crear ticket `;
        }
        ticket = null;
        return 'Agregado exitosamente';

    }
    getId() {
        return (dbTickets.tickets.length + dbTickets.ticketsAtendidos.length + 1);
    }
    update(obj) {
        ticket = new Ticket({})
        ticket.actualizarTicket(obj);
        ticket = null;
        return 'Agregado exitosamente';

    }
    getUltimos4() {
        // if (this.ticketsAtendidos.length > 4) {
        //     this.ticketsAtendidos.shift();
        // }
        // this.agregarJson();
        return this.ticketsAtendidos;
    }
    agregarJson() {
        fs.writeFileSync(__dirname + "./../json/db.json", JSON.stringify({
            fecha: 9,
            tickets: this.tickets,
            ticketsAtendidos: this.ticketsAtendidos
        }));
    }
    listTicket(){
        return this.tickets;
    }

}
module.exports = TicketCola;