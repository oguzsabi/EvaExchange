import * as buyLog from "../../controllers/buy-log/buy-log.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve a single buyLog with id
  router.get("/:id", buyLog.getOne);

  // Retrieve all buyLogs
  router.get("/", buyLog.getAll);

  app.use("/api/buy-logs", router);
};
