import axios from "axios";
import config from "../config/api";

class AvaiSalesService {
  constructor(config, http) {
    this.url = config.url;
    this.http = http;
  }
  async countries() {
    try {
      const response = await this.http.get(`${this.url}/countries`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async cities() {
    try {
      const response = await this.http.get(`${this.url}/cities`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async prices(params) {
    try {
      const response = await this.http.get(`${this.url}/prices/cheap`, {
        params,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
 
}

const aviaSalesService = new AvaiSalesService(config, axios);

export default aviaSalesService;
