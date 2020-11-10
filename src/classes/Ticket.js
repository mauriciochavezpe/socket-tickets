const dbTickets = require('../json/db.json');
const fs = require('fs');
const path = require('path');
class Ticket {
    constructor(obj) {

        // dbTickets.tickets.push({
        this.motivo = obj.motivo;
        this.createAt = obj.createAt;
        this.estado = "Espera";
        this.attendedAt = null;
        this.id = dbTickets.tickets.length + dbTickets.ticketsAtendidos.length + 1;// dbTickets.tickets.length + 1;
        // DB JSON
        this.ticketsAtendidos = dbTickets.ticketsAtendidos;
        this.tickets = dbTickets.tickets;
        this.fecha = dbTickets.fecha;
        this.resetTickets();
    }
    resetTickets() {


        if (this.fecha != new Date().getDate()) {
            this.fecha = new Date().getDate();
            this.tickets = [];
        }
        this.escribirArchivo();

    }
    crearTicket() {

        this.tickets.push({
            motivo: this.motivo,
            createAt: this.createAt,
            estado: this.estado,
            attendedAt: this.attendedAt,
            id: this.id
        })
        this.escribirArchivo();
    }
    escribirArchivo() {
        fs.writeFileSync(__dirname + '../../json/db.json', JSON.stringify({
            tickets: this.tickets,
            fecha: this.fecha,
            ticketsAtendidos: this.ticketsAtendidos
        }));

    }

    actualizarTicket(obj) {
        this.tickets.map((ticket, index) => {
            if (ticket.id == obj.id) {
                ticket.estado = "Atendido";
                ticket.attendedAt = obj.attendedAt;

                this.ticketAtendidos(ticket);
                this.tickets.splice(index, 1)
                return;
            }
        })
        this.escribirArchivo()
    }
    ticketAtendidos(ticket) {
        var TAtendidos = this.ticketsAtendidos;
        if (TAtendidos.length >= 4) {
            TAtendidos.shift();
        }
        TAtendidos.push(ticket);
        this.ticketAtendidos = TAtendidos;
    }
}
module.exports = Ticket;