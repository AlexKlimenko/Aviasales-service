import elements from '../config/ui';
import { formateDateFromString } from '../helpers/date';
import airlinesStore from '../store/airlines.store';
import locationsStore from '../store/locations.store';

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
    const depart_date = formateDateFromString(ticket.departure_at,  'MM.dd.yyyy hh:mm');
    const airlineName = airlinesStore.getAirlinesNameByCode(ticket.airline);
    const transfers = (ticket.transfers !== 0 ?  ticket.transfers : 'direct flight');
    const cityOrigin = locationsStore.getCityByCityCode(ticket.origin);
    const cityDestination = locationsStore.getCityByCityCode(ticket.destination);
   

    return `
    <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
      <img src="http://pics.avs.io/200/200/${ticket.airline}.png" width="100" height="100" alt="альтернативный текст">
      <li>Airline: ${airlineName}</li>
      <p>Flight number: ${ticket.flight_number}. Price: ${ticket.price}$. Transfers: ${transfers}</p>
      <li>Departure: ${depart_date}, ${cityOrigin} (${ticket.origin})</li>
      <li>Arrival: ${cityDestination} (${ticket.destination})</li>
      <button class="uk-button uk-button-default add-favorites" data-id="${ticket.id}">Add to favorites</button>
    </div>
    `;
  }
  
}

const ticketsUI = new TicketsUI(elements);

export default ticketsUI;