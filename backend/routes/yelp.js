let express = require('express');
let router = express.Router();
const yelp = require('yelp-fusion');
require('dotenv').config();
const client = yelp.client(process.env.API_KEY);

router.post('/', function(req, res, next) {
    let result = searchYelp();
    console.log('Results ' + result);
    res.json(searchYelp());
});

router.get('/', function(req, res) {
    client.search({
        term: req.query.term,
        location: req.query.location
    }).then(response => {
        return res.json(response.jsonBody.businesses);
    }).catch(e => {
        console.log(e);
        return res.json('There was an error fetching the Yelp information')
    });
});

const searchYelp = () => {
    client.search({
        term: 'mexican',
        location: 'harvard'
    }).then(response => {
        return response.jsonBody.businesses
    }).catch(e => {
        return e;
    })
}

module.exports = router;