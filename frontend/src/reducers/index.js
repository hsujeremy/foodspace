import { combineReducers } from 'redux';

// Make an request to Yelp endpoint in server to fetch search results object
const yelpSearchReducer = (_, action) => {
  const defaultObj = {
    success: true,
    businesses: []
  };
  if (action.type === 'YELP_SEARCHED') {
    if (action.payload.statusCode === 400) {
      return {
        success: false,
        businesses: []
      };
    }
    return {
      success: true,
      businesses: action.payload
    };
  }
  return defaultObj;
};

// Initialize selectedPlace to null
const selectedPlaceReducer = (_, action) => {
  console.log('from reducer', action)
  if (action.type === 'PLACE_SELECTED' && action.payload.statusCode !== 400) {
    return action.payload;
  }
  return null;
};

const selectedTimeReducer = (selectedTime=null, action) => {
  if (action.type === 'TIME_SELECTED') {
    return action.payload;
  } else if (action.type === 'RESET') {
    return null;
  }
  return selectedTime;
};

// Combine all the reducers into a single reducer function to send to state
export default combineReducers({
  yelpSearchResults: yelpSearchReducer,
  selectedPlace: selectedPlaceReducer,
  selectedTime: selectedTimeReducer
});
