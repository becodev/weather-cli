require("dotenv").config();
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();

  let opt;

  do {
    opt = await inquirerMenu();
    console.log(opt);

    switch (opt) {
      case 1:
        //mostrar mensaje
        const lugar = await leerInput("Ciudad: ");
        //buscar los lugares
        const lugares = await busquedas.ciudad(lugar);
        //seleccionar el lugar
        const idSelected = await listarLugares(lugares);
        const lugarSel = lugares.find((l) => l.id == idSelected);
        const { nombre, lat, lng } = lugarSel;
        //datos del clima

        const clima = await busquedas.climaLugar(lat, lng);
        const { description, temp, tempMin, tempMax } = clima;
        //mostrar resultados
        console.log("Informacion de la ciudad");
        console.log("Ciudad: ", nombre);
        console.log("Lat: ", lat);
        console.log("Lon: ", lng);
        console.log("Temperatura: ", temp);
        console.log("Minima: ", tempMin);
        console.log("Maxima: ", tempMax);
        console.log("Descripcion: ", description);

        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
