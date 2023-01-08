import * as sellLog from "../../controllers/sell-log/sell-log.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve a single sellLog with id
  router.get("/:id", sellLog.getOne);

  // Retrieve all sellLogs
  router.get("/", sellLog.getAll);

  app.use("/api/sell-logs", router);
};
