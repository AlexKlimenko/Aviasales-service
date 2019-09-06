import aviaSalesService from "../services/aviasales.services";
import { genereteId } from '../helpers/uuid';
import { formateDateFromString } from '../helpers/date';

class LocationsStore {
  constructor(api, genereteId) {
    this.api = api;
    this.countries = {};
    this.cities = {};
    this._lastSearch = {};
    this.genereteId = genereteId;
  }

  get lastSearch() {
    return Object.values(this._lastSearch);
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
    ]);

    const [countries, cities, airlines] = response;
    this.countries = countries;
    this.cities = cities;
    this.airlines = airlines;
    return response;
  }
  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this._lastSearch = this.updateData(response.data);
 }

  updateData(data) {
    return Object.entries(data).reduce((acc, [, value]) => {
      value.id = this.genereteId();
      value.cityOrigin = this.getCityByCityCode(value.origin);
      value.cityDestination = this.getCityByCityCode(value.destination);
      value.depart_date = formateDateFromString(value.departure_at,  'MM.dd.yyyy hh:mm');
      acc[value.id] = value;
      return acc;
    }, {});
  }

  getCitiesBuCountryCode(code) {
    return this.cities.filter(city => city.country_code ===code);
  }

  getCityByCityCode(code) {
    const city = this.cities.find(city => city.code === code);
    const { name_translations: { en: cityName } } = city;
    return cityName;
  }

  getCountryByCountryCode(code) {
    const country = this.countries.find(country => country.code === code);
    const { name_translations: { en: countryName } } = country;
    return countryName;
  }

  getTicketById(id) {
    return this._lastSearch[id];
  }
  
}

const locationsStore = new LocationsStore(aviaSalesService, genereteId);

export default locationsStore;
