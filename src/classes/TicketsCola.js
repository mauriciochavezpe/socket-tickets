const dbTickets = require('../json/db.json');
const Ticket = require('./Ticket');
const fs = require('fs');
var ticket = null;
class TicketCola {
    constructor() {
        this.fecha = dbTickets.fecha;
        this.tickets = dbTickets.tickets;
        this.ticketsAtendidos = dbTickets.ticketsAtendidos;
        this.resetTickets();
    }

    resetTickets() {
        if (this.fecha != new Date().getDate()) {
            this.fecha = new Date().getDate();
            this.tickets = [];
        }
        this.agregarJson();
    }

    addTickets(obj) {
       
        if (obj.createAt && obj.motivo && obj.estado) {
            ticket = new Ticket(obj)
            ticket.crearTicket();
        } else {
            return `Error al momento de crear ticket ${ticket.id}`;
        }
        ticket = null;

      
    }
    getUltimoTicket() {
        return this.tickets[this.tickets.length - 1];
    }
    actualizarTicket(obj) {
        ticket = new Ticket({})
        ticket.actualizarTicket(obj);
       
    }
    getUltimos4() {
        if (this.ticketsAtendidos.length > 4) {
            this.ticketsAtendidos.shift();
            return this.ticketsAtendidos;
        }
        this.agregarJson();
    }
    agregarJson() {

        fs.writeFileSync(__dirname + "./src/json/db.json", {
            fecha: this.fecha,
            tickets: this.tickets,
            ticketsAtendidos: this.ticketsAtendidos
        });
    }

}