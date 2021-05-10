const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
require('dotenv').config();
const client = yelp.client(process.env.API_KEY);

router.get('/', function(req, res) {
  client.search({
    term: req.query.term,
    location: req.query.location,
    price: req.query.price,
    sort_by: req.query.sort_by,
    limit: 5
  }).then(response => {
    return res.json(response.jsonBody.businesses);
  }).catch(e => {
    console.log(e);
    return res.json({
      status: 500,
      title: 'Error fetching data from Yelp Fusion API',
      detail: e
    });
  });
});

module.exports = router;
