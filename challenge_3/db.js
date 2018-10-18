const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'aaronscheckoutapp';

const client = new MongoClient(url);

// module.exports.createRecord = (data, cb) => {
//   client.connect(url)
//   .then(client => {
//     const db = client.db(dbName);
//     return db.collection('inserts').insertOne(data);
//   })
//   .then(results => cb(err, results))
//   .then(client.close)
//   .catch(() => console.log('something went wrong'));

// };

module.exports.createRecord = (data, cb) => {
  client.connect((err, client) => {
    const db = client.db(dbName);
    //console.log("data b4 cb", data);
    db.collection('checkoutdata').insertOne(data, (err, results) => {
      //console.log("results from db query ", results);
      if (err) { return cb(err, null); }
      cb(null, results);
      client.close();
    });
  });
}



module.exports.updateRecord = (updateData, cb) => {
  client.connect((err, client) => {
    const db = client.db(dbName);
    console.log(updateData.userId);
    db.collection('checkoutdata').updateOne({_id: updateData.userId}, {$set: {a: 1}}, (err, response) => {
      if (err) {
        console.log(err);
        return cb(err);
      }
      cb(null, response);
      client.close();
    });
  });
  
};