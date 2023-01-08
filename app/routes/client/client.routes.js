import * as client from "../../controllers/client/client.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve a single Client with id
  router.get("/:id", client.getOne);

  // Retrieve all Clients
  router.get("/", client.getAll);

  // Create a new Client
  router.post("/", client.createOne);

  // Update a Client with id
  router.put("/:id", client.updateOne);

  // Delete a Client with id
  router.delete("/:id", client.deleteOne);

  app.use("/api/clients", router);
};
