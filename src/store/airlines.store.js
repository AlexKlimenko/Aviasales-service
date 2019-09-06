import airlinesServices from '../services/airlines.services';

class AirlinesStore {
  constructor(api) {
    this.api = api;
    this.airlines = {};
  }
  async init() {
    const response = await this.api.airlines();
    this.airlines = response;

    return response;
  }

  getAirlinesNameByCode(code) {
    const airline = this.airlines.find(airline => airline.code === code);
    const { name_translations: { en: airlineName } } = airline;
    return airlineName;
  }
}

const airlinesStore = new AirlinesStore(airlinesServices);

export default airlinesStore;