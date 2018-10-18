const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const db = require('./db.js')

app.use(express.json());

app.post('/updatecheckout', (req, res) => {
  if (!req.body.userId) {
    //cb sends back 201, userId
    db.createRecord(req.body.data, (err, data) => {
      if(err) { console.log(err); }
       let responseToSend = {userId: data.ops[0]._id}
       console.log(data.ops)
      res.status(201).json(responseToSend);
    })
  } else {
    console.log(req.body);
    db.updateRecord(req.body, (err, data) => {
      console.log("from the db update", data);
      res.status(201).json({});
    })
  }
  //call db, callback invokes response, sending userID back
});

// app.post('/formtwo', (req, res) => {
  
// });

// app.post('/formthree', (req, res) => {
  
// });

app.use('/', express.static(__dirname + '/public'));

app.listen(3000);

