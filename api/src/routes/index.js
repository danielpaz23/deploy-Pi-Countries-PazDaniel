const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRouter = require('./countriesRoutes.js');
const activitiesRouter= require("./activitiesRoutes.js");
const routes = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
routes.use("/countries",countriesRouter );
routes.use("/activities", activitiesRouter)

module.exports = routes;
