const express = require('express');
const fs = require('fs');
const path = require('path');
const csvCreator = require('./csvCreator.js');
const crypto = require('crypto');
const app = express();

const hash = crypto.createHash('sha256');
//app.use(express.urlencoded())
app.use(express.json());
app.set('views', './views');

let sentData = {};



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

app.use('/download', (req, res, next) => {
  let key = path.basename(req.path);
  if (!sentData[key]) {
    return res.sendStatus(500);
  }
  if (!req.method === 'GET') {
    next();
  }
  res.set({status: '200', 'content-type': 'text/csv'}).send(sentData[key].split('<br/>').join('\n'));
});

// app.post('/json', (req, res) => {
//   let data = '';
//   req.on('data', chunk => {
//     data += chunk
//   }).on('end', () => {
//     console.log(typeof data);
//     //data = data.slice(data.indexOf('{'), data.lastIndexOf('}') + 1)
//     lastResponse = csvCreator(data);
//     res.set({status: '201', 'content-type':'application/json'}).render('index', {csv: lastResponse});
//   })
//   // console.log(req.body);
//   // lastResponse = csvCreator(req.body.mydata)
//   // res.status(201).render('index', {csv: lastResponse});
// });

app.post('/json', (req, res) => {
  let csv = csvCreator(req.body);
  hash.update(csv);
  let hashKey = hash.digest('hex');
  sentData[hashKey] = csvCreator(req.body);
  res.set({status: '201', 'content-type':'application/json'}).render('index', {csv}, (err, html) => {
    //console.log({hash: hashKey,html});
    res.send({hash: hashKey, html});
  });
});

app.use(express.static('./client'))

app.listen(3000);

