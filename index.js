const express = require("express");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

client.connect((err) => {
  const productCollection = client.db("mongo-curd").collection("products");
  app.post("/addProduct", (req, res) => {
    const product = req.body;
    productCollection.insertOne(product).then((result) => {
      console.log("data added successfully");
      res.send("success");
    });
  });

  console.log("DB Connected!");
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
