import * as shares from "../../controllers/share/share.controller.js";
import express from "express";

export default async (app) => {
  const router = express.Router();

  // Retrieve a single Share with id
  router.get("/:id", shares.getOne);

  // Retrieve all Shares
  router.get("/", shares.getAll);

  // Create a new Share
  router.post("/", shares.createOne);

  // Update a Share with id
  router.put("/:id", shares.updateOne);

  // Delete a Share with id
  router.delete("/:id", shares.deleteOne);

  app.use("/api/shares", router);
};
