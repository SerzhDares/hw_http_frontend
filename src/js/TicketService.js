/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  constructor() {
    // this.url = 'http://localhost:7070/?method=';
    this.url = 'https://hw-http-backend.onrender.com/?method=';
  }

  list(callback) {
    fetch(this.url + 'allTickets')
    .then(response => {
      return response.json()
    })
    .then(data => {
      callback(data);
    })
  }

  get(id, callback) {
    fetch(this.url + `ticketById&id=${id}`)
    .then(() => {
      callback();
    })
  }

  create(data, callback) {
    fetch(this.url + `createTicket`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
     })
     .then(response => {
       return response.json();
     })
     .then(data => {
       callback(data);
     })
  }

  update(id, data, callback) {
    fetch(this.url + `updateById&id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      callback(id, data);
    })
  }

  delete(id, callback) {
    fetch(this.url + `deleteById&id=${id}`)
    .then(() => {
      callback();
    })
  }
}
