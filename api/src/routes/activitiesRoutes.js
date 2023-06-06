const {Router}= require("express");
const activitiesRouter= Router();
const {getActivitiesHandlers, createActivitiesHandlers}=require("../handlers/activitiesHandlers.js")

activitiesRouter.get("/", getActivitiesHandlers)
activitiesRouter.post("/", createActivitiesHandlers)

module.exports= activitiesRouter;