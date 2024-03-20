import HelpDesk from './HelpDesk';

const ticketsContainer = document.querySelector('.tickets_container');

const app = new HelpDesk(ticketsContainer);

app.init();