const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


router.get('/', function(req, res) {
    let db = admin.firestore();
    console.log(db);
    let response = [];

    db.collection('plans').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                response.push({timeStamp: doc.id, ...doc.data()});
            });
            return res.json(response);
        })
        .catch((error) => {
            return res.json(error);
        });
});

module.exports = router;