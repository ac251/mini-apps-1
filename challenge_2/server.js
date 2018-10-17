const express = require('express');
const fs = require('fs');
const path = require('path')
const csvCreator = require('./csvCreator.js')

const app = express();
app.use(express.urlencoded())
app.use(express.json());
app.set('views', './views');

let lastResponse;



app.engine('ntl', (filePath, options, callback) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) { return callback(err); }
    let rendered = data.replace('#csv#', `<div class="csv">${options.csv}</div>`);
    callback(null, rendered);
  });
});

app.set('view engine', 'ntl');



app.get('/', (req, res) => {
  res.render('index', {csv: ''})
});

app.get('/download', (req, res) =>{
  res.status(200).send(lastResponse.split('<br/>').join('\n'));
});

app.post('/json', (req, res) => {
  console.log(req.body);
  lastResponse = csvCreator(req.body.mydata)
  res.status(201).render('index', {csv: lastResponse});
});

app.use(express.static('./client'))

app.listen(1337);

