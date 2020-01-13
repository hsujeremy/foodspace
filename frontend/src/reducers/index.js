import { combineReducers } from 'redux';

// Make an request to Yelp endpoint in server to fetch search results object
const yelpSearchReducer = (yelpSearchResults=[], action) => {
    if (action.type === 'YELP_SEARCHED') {
        return action.payload;
    }
    return yelpSearchResults;
}

// Initialize selectedPlace to null
const selectedPlaceReducer = (selectedPlace=null, action) => {
    if (action.type === 'PLACE_SELECTED') {
        console.log('FROM SELECTED PLACE REDUCER');
        console.log(action.payload);
        return action.payload;
    }
    return selectedPlace;
}

// Combine all the reducers into a single reducer function to send to state
export default combineReducers({
    yelpSearchResults: yelpSearchReducer,
    selectedPlace: selectedPlaceReducer
});