const { createActivity, getAllActivities } = require("../controllers/activitiesControllers.js")

const getActivitiesHandlers = async (req, res) => {
    const results = await getAllActivities();
    res.status(200).json(results);
};

const createActivitiesHandlers = async (req, res) => {
    const { name, difficulty, season, countries } = req.body;
    try {
        if (name || difficulty || season || countries!==[]) {
            const newActivity = await createActivity(name, difficulty, season, countries)
            res.status(201).json(newActivity);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getActivitiesHandlers, createActivitiesHandlers,
};