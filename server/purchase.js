// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 5000;
const app = express();
const cors = require("cors");
// Connect to MongoDB
mongoose.connect("mongodb+srv://gargaditya2405:05dx9FW99PHBg2za@arkadatabase.6xgb4kx.mongodb.net/?retryWrites=true&w=majority&appName=ArkaDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("Connected")

// Define schema
const purchaseSchema = new mongoose.Schema({
  linkToPurchase: String,
  componentName: String,
  quantity: Number,
  chimsFile: String,
  poBomQuoteFile: String,
  project: String,
  team: String,

});

const Purchase = mongoose.model("Purchase", purchaseSchema);

app.use(bodyParser.json());
app.use(cors());
// Handle form submission
app.post("/purchase", async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).send(purchase);
  } catch (error) {
    res.status(400).send(error);json("success")
  }
});
app.get("/purchase", async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
