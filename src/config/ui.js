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
  btnFavorite: document.querySelector('.favorites-btn'),
  // btnDeleteFavorite: document.querySelector('.delete-favorites-btn'),
  favorites: document.querySelector('.favorites'),
};

export default elements;