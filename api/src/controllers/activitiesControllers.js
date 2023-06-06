const { Country, Activity, countryactivity} = require("../db");
const axios = require ('axios');


const createActivity = async (name,difficulty, season, countries) => {
    if(!name ){
        return {error:"¡Falta Nombre!"}
    }else if(!difficulty){
        return {error:"¡Falta Dificultad!"}
    }else if(!season){
        return {error:"¡Falta temporada!"}
    }else if(countries.length ===0){
        return {error:"¡Seleciona un pais!"}
    }else{
        const newActivity = await Activity.create({ name, difficulty, season });
            await newActivity.setCountries(countries);
            return newActivity;
    }
}
const getAllActivities = async () => {
    const databaseActivities = await Activity.findAll({
        include: {
            model: Country,
            attributes: ['name'],
            through: { attributes: [] },
        }
    });
    return results = [...databaseActivities];
}

module.exports={getAllActivities, createActivity};