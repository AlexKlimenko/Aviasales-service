import elements from '../config/ui';
import airlinesStore from '../store/airlines.store';

class TicketsUI {
  constructor(el) {
    this.container = el.ticketsContainer;
  }

  renderTickets(tickets) {
    this.container.innerHTML = '';

    let fragment = "";
    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }
  static ticketTemplate(ticket) {
    const airlineName = airlinesStore.getAirlinesNameByCode(ticket.airline);
    const transfers = (ticket.transfers !== 0 ?  ticket.transfers : 'direct flight');

    return `
    <div class="uk-card uk-card-default uk-card-body uk-width-1-3@m">
      <img src="http://pics.avs.io/200/200/${ticket.airline}.png" width="100" height="100" alt="logo">
      <li>Airline: <b>${airlineName}</b></li>
      <p>Flight number: <b>${ticket.flight_number}</b>. Price: <b>${ticket.price}$</b>. Transfers: <b>${transfers}</b></p>
      <li>Departure: <b>${ticket.depart_date}, ${ticket.cityOrigin} (${ticket.origin})</b></li>
      <li>Arrival: <b>${ticket.cityDestination} (${ticket.destination})</b></li>
      <button class="uk-button uk-button-default add-favorites" data-id="${ticket.id}">Add to favorites</button>
    </div>
    `;
  }
  
}

const ticketsUI = new TicketsUI(elements);

export default ticketsUI;