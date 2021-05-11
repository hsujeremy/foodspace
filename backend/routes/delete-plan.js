const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', function(req, res) {
  console.log('delete-plan', req.query.timeStamp);
  let db = admin.firestore();
  let docRef = db.collection('plans').doc(req.query.timeStamp);

  docRef.delete().then(() => {
    console.log('Document successfully deleted!');
  }).catch((error) => {
    console.error('Error removing document: ', error);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
