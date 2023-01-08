import * as portfolioShare from "../../controllers/portfolio-share/portfolio-share.controller.js";
import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve a single portfolioShare with id
  router.get("/:id", portfolioShare.getOne);

  // Retrieve all portfolioShares
  router.get("/", portfolioShare.getAll);

  app.use("/api/portfolio-shares", router);
};
