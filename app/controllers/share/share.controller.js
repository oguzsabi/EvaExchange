import db from "../../models/index.js";
const Share = db.shares;
const Op = db.Sequelize.Op;

// Create and Save a new Share
export function create(req, res) {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
}

// Retrieve all Shares from the database.
export function findAll(req, res) {}

// Find a single Share with an id
export function findOne(req, res) {}

// Update a Share by the id in the request
export function update(req, res) {}

// Delete a Share with the specified id in the request
const _delete = (req, res) => {};
export { _delete as delete };

// Delete all Shares from the database.
export function deleteAll(req, res) {}

// Find all published Shares
export function findAllPublished(req, res) {}
