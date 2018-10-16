const express = require('express');
const fs = require('fs');
const path = require('path')

const app = express();


app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '/client/index.html'), 'utf-8', (err, data) => {
    console.log(data);
    res.status(200).set('Content-type', 'text/html').send(data);
  });
});


app.listen(1337);

