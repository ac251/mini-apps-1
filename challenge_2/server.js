const express = require('express');
const fs = require('fs');
const path = require('path')
const csvCreator = require('./csvCreator.js')

const app = express();
app.use(express.urlencoded())
//app.use(express.json());
app.set('views', './views');

let lastResponse;



app.engine('ntl', (filePath, options, callback) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) { return callback(err); }
    let rendered = data.replace('#csv#', options.csv);
    callback(null, rendered);
  });
});

app.set('view engine', 'ntl');



// app.get('/', (req, res) => {
//   res.render('index', {csv: ''})
// });

app.get('/download', (req, res) =>{
  res.status(200).send(lastResponse.split('<br/>').join('\n'));
});

app.post('/json', (req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk
  }).on('end', () => {
    data = data.toString();
    console.log(data);
    //data = data.slice(data.indexOf('{'), data.lastIndexOf('}') + 1)
    lastResponse = csvCreator(data);
    res.set({status: '201', 'content-type':'application/json'}).render('index', {csv: lastResponse});
  })
  // console.log(req.body);
  // lastResponse = csvCreator(req.body.mydata)
  // res.status(201).render('index', {csv: lastResponse});
});

app.use(express.static('./client'))

app.listen(1337);

