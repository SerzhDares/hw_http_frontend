/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {

  ticketMarking(id, name, description, created, status) {
    if (status) {
      return `<div class="ticket" id=${id}>
                <input type="checkbox" class="ticket_status" checked>
                <div class="ticket_text">
                  <span class="ticket_name">${name}</span>
                  <p class="ticket_description description_visible">${description}</p>
                </div>
                <div class="ticket_date_buttons">
                  <span class="ticket_date">${created}</span>
                  <button class="ticket_edit_button">Изменить</button>
                  <button class="ticket_delete_button">Удалить</button>
              </div>`
    } else {
      return `<div class="ticket" id=${id}>
                <input type="checkbox" class="ticket_status">
                <div class="ticket_text">
                    <span class="ticket_name">${name}</span>
                    <p class="ticket_description description_visible">${description}</p>
                </div>
                <div class="ticket_date_buttons">
                  <span class="ticket_date">${created}</span>
                  <button class="ticket_edit_button">Изменить</button>
                  <button class="ticket_delete_button">Удалить</button>
              </div>`
    }
  } 
}
