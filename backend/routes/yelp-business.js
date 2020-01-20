const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
require('dotenv').config();
const client = yelp.client(process.env.API_KEY);

router.get('/', function(req, res) {
    console.log(req.query);
    client.business(req.query.id).then(response => {
        console.log(response.jsonBody.name);
        return res.json(response.jsonBody);
    }).catch(e => {
        console.log(e);
        return res.json('There was an error fetching the Yelp business information');
    });
});

module.exports = router;