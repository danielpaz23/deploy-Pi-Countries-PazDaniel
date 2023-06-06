import {
    GET_ACT,
    GET_COUNTRY,
    GET_COUNTRIES,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    SORT_BY_NAME_ASC,
    SORT_BY_NAME_DESC,
    SORT_BY_POPULATION_ASC,
    SORT_BY_POPULATION_DESC,
    SEARCH_COUNTRY_NAME,
} from "./actions";

const initialState = {
    country: [],
    countries: [],
    activities: [],
    filteredCountries: [],
    allCountries: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACT:
            return { ...state, activities: action.payload };
        case GET_COUNTRY:
            return { ...state, country: action.payload };
        case GET_COUNTRIES:
            return { ...state, countries: action.payload, allCountries: action.payload };
        case FILTER_BY_CONTINENT:
            const filteredByContinent = state.countries.filter(
                (country) =>
                    action.payload === "" ? true : country.continents.includes(action.payload)
            );
            return { ...state, filteredCountries: filteredByContinent };
        case FILTER_BY_ACTIVITY:
            const filteredByActivity = action.payload
            return { ...state, filteredCountries: filteredByActivity };
        case SORT_BY_NAME_ASC:
            const countriesToSortNameAsc = state.filteredCountries.length > 0 ? state.filteredCountries : state.countries;
            const sortedByNameAsc = countriesToSortNameAsc.slice().sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            return { ...state, filteredCountries: sortedByNameAsc };
        case SORT_BY_NAME_DESC:
            const countriesToSortNameDesc = state.filteredCountries.length > 0 ? state.filteredCountries : state.countries;
            const sortedByNameDesc = countriesToSortNameDesc.slice().sort((a, b) =>
                b.name.localeCompare(a.name)
            );
            return { ...state, filteredCountries: sortedByNameDesc };
        case SORT_BY_POPULATION_ASC:
            const countriesToSortPopulationAsc = state.filteredCountries.length > 0 ? state.filteredCountries : state.countries;
            const sortedByPopulationAsc = countriesToSortPopulationAsc.slice().sort((a, b) =>
                a.population - b.population
            );
            return { ...state, filteredCountries: sortedByPopulationAsc };
        case SORT_BY_POPULATION_DESC:
            const countriesToSortPopulationDesc = state.filteredCountries.length > 0 ? state.filteredCountries : state.countries;
            const sortedByPopulationDesc = countriesToSortPopulationDesc.slice().sort((a, b) =>
                b.population - a.population
            );
            return { ...state, filteredCountries: sortedByPopulationDesc };
        case SEARCH_COUNTRY_NAME:
            return { ...state, filteredCountries: action.payload };
        default:
            return state;
    }
};

export default rootReducer;