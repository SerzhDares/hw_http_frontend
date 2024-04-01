import TicketService from "./TicketService";
import TicketView from "./TicketView";

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.ticketService = new TicketService();
    this.addTicketForm = document.querySelector('.add_ticket_form');
    this.updateTicketForm = document.querySelector('.update_ticket_form');
    this.viewNewTicket = this.viewNewTicket.bind(this);
  }

  init() {
    this.ticketService.list(this.viewTickets);
    this.updateAllTickets();
    this.deleteAllTickets();
    this.changeAllTicketsStatus();
    this.getAllTicketsDescription();
    this.newTicketForm();
  }

  viewTickets(tickets) {
    tickets.forEach(ticket => {
      document.querySelector('.tickets_container').insertAdjacentHTML('beforeend', new TicketView().ticketMarking(ticket.id, ticket.name, ticket.description, ticket.created, ticket.status));
    });
  }

  newTicketForm() {
    document.querySelector('.add_button').addEventListener('click', () => {
      this.addTicketForm.classList.remove('form_visible');
    })
    document.querySelector('.cancel_addform_button').addEventListener('click', () => {
      this.addTicketForm.classList.add('form_visible');
    })
    document.querySelector('.ok_addform_button').addEventListener('click', () => {
      this.addTicket();
    })
  }

  viewNewTicket(ticket) {
    document.querySelector('.tickets_container').insertAdjacentHTML('beforeend', new TicketView().ticketMarking(ticket.id, ticket.name, ticket.description, ticket.created, ticket.status));
    const newTicket = document.querySelector('.tickets_container').lastElementChild;
    this.changeTicketStatus(newTicket.querySelector('.ticket_status'));
    this.getTicketDescription(newTicket.querySelector('.ticket_name'));
    this.updateTicket(newTicket.querySelector('.ticket_edit_button'));
    this.deleteTicket(newTicket.querySelector('.ticket_delete_button'));
  }

  addTicket() {
    const ticketName = document.getElementById('ticket_name').value;
    const ticketDescription = document.getElementById('ticket_description').value;
    this.ticketService.create({name: `${ticketName}`, description: `${ticketDescription}`, status: false}, this.viewNewTicket);
    this.addTicketForm.classList.add('form_visible');
  }

  changeTicketStatus(checkbox) {
    checkbox.addEventListener('click', e => {
      const id = e.target.closest('.ticket').id;
      if (e.target.checked) {
        new TicketService().update(id, {status: true});
      } else {
        new TicketService().update(id, {status: false});
      }
    })
  }

  changeAllTicketsStatus() {
    setTimeout(() => {
      document.querySelectorAll('.ticket_status').forEach(checkbox => {
        this.changeTicketStatus(checkbox);
      })
    }, 10)
  }
  
  getTicketDescription(ticket) {
    ticket.addEventListener('click', e => {
      new TicketService().get(e.target.closest('.ticket').id, () => {
        e.target.closest('.ticket').firstElementChild.nextElementSibling.lastElementChild.classList.toggle('description_visible');
      })
    })
  }

  getAllTicketsDescription() {
    setTimeout(() => {
      document.querySelectorAll('.ticket_text').forEach(ticket => {
        this.getTicketDescription(ticket);
      })
    }, 10)
  }

  viewChanges(id, tickets) {
    const targetTicket = document.getElementById(`${id}`);
    console.log(tickets);
    console.log(id);
    tickets.forEach(ticket => {
      if(id === ticket.id) {
        targetTicket.querySelector('.ticket_name').textContent = ticket.name;
        targetTicket.querySelector('.ticket_description').textContent = ticket.description;
      }
    })
  }

  updateTicket(button) {
    const updateTicketForm = document.querySelector('.update_ticket_form');
    const updateTicketName = document.getElementById('update_ticket_name');
    const updateTicketDescription = document.getElementById('update_ticket_description');
    button.addEventListener('click', e => {
      const targetTicket = e.target.closest('.ticket');
      updateTicketForm.classList.remove('form_visible');
      updateTicketForm.dataset.id = targetTicket.id;
      updateTicketName.value = targetTicket.firstElementChild.nextElementSibling.firstElementChild.textContent;
      updateTicketDescription.value = targetTicket.firstElementChild.nextElementSibling.lastElementChild.textContent;
    })
    document.querySelector('.ok_updateform_button').addEventListener('click', () => {
      new TicketService().update(updateTicketForm.dataset.id, {name: `${updateTicketName.value}`, description: `${updateTicketDescription.value}`}, this.viewChanges);
      updateTicketForm.classList.add('form_visible');
    })
    document.querySelector('.cancel_updateform_button').addEventListener('click', () => {
      updateTicketForm.classList.add('form_visible');
    })
  }

  updateAllTickets() {
    setTimeout(() => {
      document.querySelectorAll('.ticket_edit_button').forEach(button => {
        this.updateTicket(button);
      })
    }, 10)
  }

  deleteTicket(button) {
    button.addEventListener('click', e => {
      new TicketService().delete(e.target.closest('.ticket').id, () => {
        e.target.closest('.ticket').remove();
      })
    })
  }

  deleteAllTickets() {
    setTimeout(() => {
      document.querySelectorAll('.ticket_delete_button').forEach(button => {
        this.deleteTicket(button);
      })
    }, 10)
  }

}
