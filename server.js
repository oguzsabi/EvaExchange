import express, { json, urlencoded } from "express";
import bodyParser from "body-parser";
import { sequelize } from "./app/models/index.js";
import ShareRoutes from "./app/routes/share/share.routes.js";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "http://localhost:8081",
};
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));

// parse json requests
app.use(json());

// parse urlencoded requests
app.use(urlencoded({ extended: true }));

// simple get route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EvaExchange!" });
});

ShareRoutes(app);

// use set port and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
