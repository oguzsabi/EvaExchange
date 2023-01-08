import express, { json, urlencoded } from "express";
import bodyParser from "body-parser";
import { sequelize } from "./app/models/index.js";
import ShareRoutes from "./app/routes/share/share.routes.js";
import cors from "cors";
import { seed } from "./app/models/seed.js";

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

await ShareRoutes(app);

// use set port and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

sequelize
  .sync({ force: true })
  .then(async () => {
    await seed();

    console.log("Synced db.");
  })
  .catch((err) => {
    console.error(`Failed to sync db: ${err.message}`);
  });
