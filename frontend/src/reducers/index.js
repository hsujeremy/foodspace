import { combineReducers } from 'redux';

// Make an request to Yelp endpoint in server to fetch search results object
const yelpSearchReducer = (yelpSearchResults=[], action) => {
    if (action.type === 'YELP_SEARCHED') {
        return action.payload;
    }
    return yelpSearchResults;
};

// Initialize selectedPlace to null
const selectedPlaceReducer = (selectedPlace=null, action) => {
    if (action.type === 'PLACE_SELECTED') {
        return action.payload;
    }
    return selectedPlace;
}

const selectedTimeReducer = (selectedTime=null, action) => {
    console.log(action.payload);
    if (action.type === 'TIME_SELECTED') {
        return action.payload;
    }
    return selectedTime;
}

// Combine all the reducers into a single reducer function to send to state
export default combineReducers({
    yelpSearchResults: yelpSearchReducer,
    selectedPlace: selectedPlaceReducer,
    selectedTime: selectedTimeReducer
});