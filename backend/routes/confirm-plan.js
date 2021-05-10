const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', function(req, res) {
  let db = admin.firestore();
  let docRef = db.collection('plans').doc(req.query.timeStamp);

  docRef.set({
    place: req.query.place,
    startTime: req.query.startTime,
    endTime: req.query.endTime
  }).then(() => console.log('Successfully inputted data'))
    .catch(error => console.error(error));

  res.render('index', { title: 'Express' });
});

module.exports = router;
