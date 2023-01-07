import * as shares from '../../controllers/share/share.controller.js';
import express from "express";

export default (app) => {
  const router = express.Router();

  // Create a new Share
  router.post("/", shares.create);

  // Retrieve all Shares
  router.get("/", shares.findAll);

  // Retrieve all published Shares
  router.get("/published", shares.findAllPublished);

  // Retrieve a single Share with id
  router.get("/:id", shares.findOne);

  // Update a Share with id
  router.put("/:id", shares.update);

  // Delete a Share with id
  router.delete("/:id", shares.delete);

  // Create a new Share
  router.delete("/", shares.deleteAll);

  app.use("/api/shares", router);
};
