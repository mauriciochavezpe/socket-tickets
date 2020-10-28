const dbTickets = require('../json/db.json');
class Ticket {
    constructor(obj) {

        // dbTickets.tickets.push({
        this.motivo = obj.motivo;
        this.createAt =  obj.createAt;
        this.estado = "Espera";
        this.attendedAt = null;
        this.id = dbTickets.tickets.length + 1;
        // this.crearTicket();
        // })
    }

    crearTicket() {
        return dbTickets.tickets.push({
            motivo: this.motivo,
            createAt: this.createAt,
            estado: this.estado,
            attendedAt: this.attendedAt,
            id: this.id
        })
        
    }

    cambiarEstado(obj) {
        dbTickets.tickets.map((ticket,index) => {
            if (ticket.id == obj.id) {
                ticket.estado = "Atendido";
                ticket.attendedAt = obj.attendedAt;
                dbTickets.ticketsAtendidos.push(ticket);
                dbTickets.tickets.splice(index,1)
                return;
            }
        })
    }

}