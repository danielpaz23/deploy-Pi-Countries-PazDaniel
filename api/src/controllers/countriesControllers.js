const { Country, Activity, countryactivity } = require("../db");
const { Op} = require('sequelize');

const getAllCountries = async () => {
    const databaseCountry = await Country.findAll();
    return databaseCountry;
}

const getCountrieById = async (id) => {
    try {
        if (!id || typeof id !== 'string' || id.length !== 3) {
          throw new Error('El ID del país debe ser una cadena de 3 letras.');
        }
        const results = await Country.findOne({
          where: {
            id: id.toUpperCase()
          },
          include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'season'],
            through: { attributes: [] }
          }
        });
        if (!results) {
          throw new Error('No se encontró ningún país con el ID especificado.');
        }
        return results;
      } catch (error) {
        console.error(error);
        throw new Error('Error al buscar el país en la base de datos.');
      }
};

const searchCountrieByName = async (name) => {
    const databaseCountries = await Country.findAll({
        where:
        {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'season'],
            through: { attributes: [] },
        },
    })
    const results = [...databaseCountries];
    if (results.length > 0) {
        return results;
    } else {
        return { message: `No se encontraron Country que coincidan con ${name}` }
    }
}

module.exports = { getCountrieById, getAllCountries, searchCountrieByName };

