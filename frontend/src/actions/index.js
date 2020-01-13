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