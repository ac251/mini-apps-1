const express = require('express');
const fs = require('fs');
const path = require('path')
const csvCreator = require('./csvCreator.js')

const app = express();
app.use(express.urlencoded())
app.use(express.json());


app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '/client/index.html'), 'utf-8', (err, data) => {
    res.status(200).set('Content-type', 'text/html').send(data);
  });
});

app.post('/json', (req, res) => {
  console.log(req.body);
  res.status(201).set('Content-Type', 'text/plain').send(csvCreator(JSON.parse(req.body.mydata)));
});


app.listen(1337);

