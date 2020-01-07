let express = require('express');
let router = express.Router();
const yelp = require('yelp-fusion');
require('dotenv').config();
const client = yelp.client(process.env.API_KEY);

router.get('/', function(req, res, next) {
    client.search({
        term: 'mexican',
        location: 'harvard'
    }).then(response => {
        return res.json(response.jsonBody.businesses);
    }).catch(e => {
        console.log(e);
        return res.json('There was an error fetching the Yelp information')
    });
});

module.exports = router;