import { combineReducers } from 'redux';

// Make an request to Yelp endpoint in server to fetch search results object
const yelpSearchReducer = (yelpSearchResults=[], action) => {
    if (action.type === 'YELP_SEARCHED') {
        console.log(action.payload);
        return action.payload;
    }
    return yelpSearchResults;
}

// Combine all the reducers into a single reducer function to send to state
export default combineReducers({
    yelpSearchResults: yelpSearchReducer
});