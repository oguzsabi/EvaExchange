import * as priceLog from "../../controllers/price-log/price-log.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve a single priceLog with id
  router.get("/:id", priceLog.getOne);

  // Retrieve all priceLogs
  router.get("/", priceLog.getAll);

  app.use("/api/price-logs", router);
};
