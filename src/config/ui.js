const elements = {
  form: document.forms['locationControls'],
  countryOrigin: document.getElementById('countryOrigin'),
  countryDestination: document.getElementById('countryDestination'),
  cityOrigin: document.getElementById('cityOrigin'),
  cityDestination: document.getElementById("cityDestination"),
  startDate: document.getElementById('startDate'),
  endDate: document.getElementById('endDate'),
  ticketsContainer: document.querySelector('.tickets-container'),
  favoriteList: document.querySelector('.favorites-items'),
};

export default elements;