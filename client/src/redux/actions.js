import axios from "axios";
export const GET_ACT = "GET_ACT"
export const GET_COUNTRY = "GET_COUNTRY"
export const GET_COUNTRIES = "GET_COUNTRIES"
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT"
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY"
export const SORT_BY_NAME_ASC = "SORT_BY_NAME_ASC"
export const SORT_BY_NAME_DESC = "SORT_BY_NAME_DESC"
export const SORT_BY_POPULATION_ASC = "SORT_BY_POPULATION_ASC"
export const SORT_BY_POPULATION_DESC = "SORT_BY_POPULATION_DESC"
export const SEARCH_COUNTRY_NAME = "SEARCH_COUNTRY_NAME"
export const getAct = () => {
    try {
        return async function (dispatch) {
            const apiData = await axios.get(`activities/`);
            const activities = apiData.data;
            dispatch({ type: GET_ACT, payload: activities })
        }
    } catch (error) {
        return ({ error: error.message })
    }
}
export const getCountry = (id) => {
    try {
        return async function (dispatch) {
            const apiData = await axios.get(`countries/${id}`);
            const country = apiData.data;
            dispatch({ type: GET_COUNTRY, payload: country })
        }
    } catch (error) {
        return ({ error: error.message })
    }
}
export const getCountries = () => {
    try {
        return async function (dispatch) {
            const response = await axios.get(`countries/`);
            const activitiesResponse = await axios.get(`activities/`);
            const activities = activitiesResponse.data;
            const countries = response.data.map((country) => {
                const countryActivities = activities.filter((activity) =>
                    activity.Countries.some((countryObj) => countryObj.name === country.name)
                );
                const activityNames = countryActivities.map((activity) => activity.name);
                return { ...country, activities: activityNames };
            });
            dispatch({
                type: GET_COUNTRIES,
                payload: countries,
            });
        };
    } catch (error) {
        return { error: error.message };
    }
};
export const filterByContinent = (continent) => ({
    type: FILTER_BY_CONTINENT,
    payload: continent,
});
export const filterByActivity = (activity) => {
    try {
        return async function (dispatch) {
            const response = await axios.get(`countries/`);
            const activitiesResponse = await axios.get(`activities/`);
            const activities = activitiesResponse.data;
            const countries = response.data.map((country) => {
                const countryActivities = activities.filter((activity) =>
                    activity.Countries.some((countryObj) => countryObj.name === country.name)
                );
                const activityNames = countryActivities.map((activity) => activity.name);
                return { ...country, activities: activityNames };
            });
            let filteredCountries;
            if (activity === "") {
                filteredCountries = countries;
            } else {
                filteredCountries = countries.filter((country) =>
                    country.activities.includes(activity)
                );
            }
            dispatch({
                type: FILTER_BY_ACTIVITY,
                payload: filteredCountries,
            });
        };
    } catch (error) {
        return { error: error.message };
    }
};
export const sortByNameAsc = () => ({
    type: SORT_BY_NAME_ASC,
});
export const sortByNameDesc = () => ({
    type: SORT_BY_NAME_DESC,
});
export const sortByPopulationAsc = () => ({
    type: SORT_BY_POPULATION_ASC,
});
export const sortByPopulationDesc = () => ({
    type: SORT_BY_POPULATION_DESC,
});
export const searchCountryName = (name) => {
    try {
        return async function (dispatch) {
            const apiData = await axios.get(`countries?name=${name}`);
            const country = apiData.data;
            dispatch({ type: SEARCH_COUNTRY_NAME, payload: country })
        }
    } catch (error) {
        return ({ error: error.message })
    }
}

