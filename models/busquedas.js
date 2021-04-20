const axios = require("axios");

class Busquedas {
  historial = [];

  constructor() {
    //!TODO: leer db si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: "es",
      units: "metric",
    };
  }

  async ciudad(lugar = "") {
    //peticion http
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const response = await instance.get();

      return response.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {}

    return []; //retornar los lugares
  }

  async climaLugar(lat, lon) {
    try {
      //axios instance

      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });
      //response, extraer informacion en data

      const response = await instance.get();
      // console.log("main");
      // console.log(response.data.main);
      // console.log("description");
      // console.log(response.data.weather[0].description);

      //retornar objeto
      return {
        description: response.data.weather[0].description,
        tempMin: response.data.main.temp_min,
        tempMax: response.data.main.temp_max,
        temp: response.data.main.temp,
      };
    } catch (error) {
      console.log("hola error");
    }
  }
}

module.exports = Busquedas;
