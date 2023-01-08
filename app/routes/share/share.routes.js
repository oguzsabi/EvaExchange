import * as share from "../../controllers/share/share.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve a single Share with id
  router.get("/:id", share.getOne);

  // Retrieve all Shares
  router.get("/", share.getAll);

  // Create a new Share
  router.post("/", share.createOne);

  // Update a Share with id
  router.put("/:id", share.updateOne);

  // Delete a Share with id
  router.delete("/:id", share.deleteOne);

  // Buy Share
  router.post("/buy", share.buyOne);

  // Sell Share
  router.post("/sell", share.sellOne);

  app.use("/api/shares", router);
};
