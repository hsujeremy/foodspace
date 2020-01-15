import axios from 'axios';

// Pass in the form value as arg
// Return the search results object as the payload
export const searchYelp = params => async dispatch => {
    const response = await axios.get('/yelp', {
        params
    });

    dispatch({
        type: 'YELP_SEARCHED',
        payload: response.data
    });
};

export const selectPlace = place => async dispatch => {
    const response = await axios.get('/yelp-business', {
        params: { id: place.id }
    });

    dispatch({
        type: 'PLACE_SELECTED',
        payload: response.data
    })
};

// times is a plain JS object containing a start and end time (24-hour clock)
export const selectTime = times => {
    return {
        type: 'TIME_SELECTED',
        payload: times
    };
}