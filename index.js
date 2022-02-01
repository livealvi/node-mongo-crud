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
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
