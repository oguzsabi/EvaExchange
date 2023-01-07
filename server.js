const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:8081"
};
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));

// parse json requests
app.use(express.json());

// parse urlencoded requests
app.use(express.urlencoded({ extended: true }));

// simple get route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EvaExchange!" });
});

// use set port and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
