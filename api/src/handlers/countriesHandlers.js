const {getCountrieById, getAllCountries, searchCountrieByName} = require("../controllers/countriesControllers.js")

const getCountriesHandlers = async (req, res) => {
    const {name} = req.query;
    const results= name ? await searchCountrieByName(name): await getAllCountries();
    res.status(200).json(results);
};

const getCountrieHandlers = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const countrie = await getCountrieById(id);
        res.status(200).json(countrie);
    } catch (error) {
        res.status(400).json({ error: error.message })
    } 
};

module.exports = {
    getCountriesHandlers,
    getCountrieHandlers,
};