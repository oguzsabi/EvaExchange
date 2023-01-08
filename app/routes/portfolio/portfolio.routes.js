import * as portfolio from "../../controllers/portfolio/portfolio.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve a single Portfolio with id
  router.get("/:id", portfolio.getOne);

  // Retrieve all Portfolios
  router.get("/", portfolio.getAll);

  // Create a new Portfolio
  router.post("/", portfolio.createOne);

  // Delete a Portfolio with id
  router.delete("/:id", portfolio.deleteOne);

  app.use("/api/portfolios", router);
};
