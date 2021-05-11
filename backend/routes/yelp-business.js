const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
require('dotenv').config();
const client = yelp.client(process.env.API_KE);

router.get('/', function(req, res) {
  client.business(req.query.id).then(response => {
    return res.json(response.jsonBody);
  }).catch(e => {
    console.log(e);
    return res.json(e);
  });
});

module.exports = router;
