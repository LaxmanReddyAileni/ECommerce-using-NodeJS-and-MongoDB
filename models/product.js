const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb; // get access to database instead of connecting to db

class Product {
  constructor(title, price, description, imageUrl, id,userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null; //Optional //Converting string to ObjectId as the mongodb has id in object
    //if if existed we then we should convert into ObjectId orelse we can return id as null
    this.userId=userId;
  }

  save() {
    //Save the product in DB
    const db = getDb();
    let dbOp;
    if (this._id) {
      //Update existing product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this }); //If _id is equal to mongodb _id then update //$set:this   mongo code which states to update the filtered product
    } else {
      //new product
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    //Fetch all the products
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static fetchProduct(prodId) {
    //findbyId                      //fetching single product
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
