//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const axios = require('axios');
const { conn, Country} = require('./src/db.js');

async function fetchAndSaveCountries() {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;
    // Filtrar y transformar los datos de la API
    const filteredCountries = countries.map(country => {
      return {
        name: country.name.common,
        id: country.cca3,
        flags: country.flags ? country.flags.svg : null,
        continents: country.continents[0],
        capital: country.capital ? country.capital[0] : 'N/A',
        area: country.area,
        population: country.population
      };
    });
    // Sincronizar el modelo Country con la base de datos
    await Country.sync();
    // Guardar los países en la base de datos
    await Country.bulkCreate(filteredCountries);
    console.log('Los países se han guardado correctamente en la base de datos.');
  } catch (error) {
    console.error('Ocurrió un error al obtener o guardar los países:', error);
  }
}
// mandar la funcion al controller
conn.sync({ force: false}).then(() => {
    // fetchAndSaveCountries();
    
      server.listen(3001, () => {
        console.log('%s listening at 3001');
      });
    })
    .catch(error => {
      console.error('Ocurrió un error al iniciar el servidor:', error);
    });
