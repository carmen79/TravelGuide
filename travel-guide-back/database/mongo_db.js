/*
    Mongo DB Connection manager
*/
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'travelling';

MongoClient.connect(
    url,
    {
        useNewUrlParser: true
    },
    function (err, db) {
        if (err) throw err;
        global.dbo = db.db(dbName);
    }
);