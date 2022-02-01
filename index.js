const express = require("express");
const morgan = require("morgan");
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://livealvi:bHgL4eR2akoBts95@cluster0.amhkf.mongodb.net/mongo-curd?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("I am Running!");
});

client.connect((err) => {
  const collection = client.db("mongo-curd").collection("products");
  // perform actions on the collection object

  const product = { name: "honey", price: 25, quantity: 20 };

  collection.insertOne(product).then((result) => {
    console.log("One Product Added");
  });

  console.log("DB Connected!");
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
