/*
imported mongodb and used the connection string from the mongodb website to mongodb connect/Password should not have special symbols
 */
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://LaxmanReddy:gOr8V1D0MEgp084y@course.jss6y.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found!";
};

exports.mongoConnect = mongoConnect; //Connect and store connection in the database
exports.getDb = getDb; //access to connected database
