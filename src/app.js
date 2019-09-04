import "./style.css";
import './plugins';
import UIkit from 'uikit';
import locationsStore from "./store/locations.store";
import favoritesStore from './store/favorites.store';
import airlinesStore from './store/airlines.store';
import formUi from "./views/form";
import ticketsUI from './views/tickets';
import favoriteUI from './views/favorites';
import elements from './config/ui';
import { formateDateFromString } from './helpers/date';

const {
  form,
  countryOrigin,
  countryDestination,
  startDate, endDate,
  cityOrigin,
  cityDestination,
  ticketsContainer
} = elements;

document.addEventListener('DOMContentLoaded', () => {
  initApp();

// Events
  countryOrigin.addEventListener('change', e => {
    onCounryChange('cityOrigin', countryOrigin.value);
  });

  countryDestination.addEventListener('change', e => {
    onCounryChange('cityDestination', countryDestination.value);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    searchTickets();
  });

  ticketsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('add-favorites')) {
      const id = e.target.dataset.id;
      onAddToFavorites(id);
    }
  });

  // Handlers
  async function initApp() {
    await locationsStore.init();
    await airlinesStore.init();
    formUi.renderCountries(locationsStore.countries);
  };

  function onCounryChange(type, value) {
    const cities = locationsStore.getCitiesBuCountryCode(value);
    formUi.renderCities(type, cities);
  };

  async function searchTickets() {
    const depart_date = formateDateFromString(startDate.value, 'yyyy-MM');
    const return_date = formateDateFromString(endDate.value, 'yyyy-MM');
    const origin = cityOrigin.value;
    const destination = cityDestination.value;
    
    await locationsStore.fetchTickets({
      origin, 
      destination,
      depart_date,
      return_date,
    });
    
    if(locationsStore.lastSearch.length === 0) {
      UIkit.notification('There are no any tickets for selected direction');
    }
    ticketsUI.renderTickets(locationsStore.lastSearch);

  }

  function onAddToFavorites(id) {
    const ticket = locationsStore.getTicketById(id);
    favoritesStore.addNewFavorite(ticket);
    favoriteUI.renderFavorites(favoritesStore.favorites);
  }
})
