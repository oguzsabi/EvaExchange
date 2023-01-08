import db from "../../models/index.js";

const Client = db.clients;
const Op = db.Sequelize.Op;

// Get a single Client with id
export function getOne(req, res) {
  const id = req.params.id;

  Client.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Client with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Client with id=${id}`,
      });
    });
}

// Get all Clients from the database
export function getAll(req, res) {
  Client.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Clients.",
      });
    });
}

// Create Client
export function createOne(req, res) {
  if (!req.body.name) {
    res.status(400).send({
      message: "Body can not be empty.",
    });
    return;
  }

  const client = {
    name: req.body.name,
  };

  Client.create(client)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client.",
      });
    });
}

// Update one Client with id
export function updateOne(req, res) {
  const id = req.params.id;

  Client.update(req.body, { where: { id } })
    .then((result) => {
      if (Array.isArray(result) && result[0] === 1) {
        res.send({
          message: "Client was updated successfully.",
        });

        return;
      }

      res.send({
        message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Client with id=${id}`,
      });
    });
}

// Delete one Client with id
export function deleteOne(req, res) {
  const id = req.params.id;

  Client.destroy({
    where: { id },
  })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "Client was deleted successfully!",
        });

        return;
      }

      res.send({
        message: `Cannot delete Client with id=${id}. Maybe Client was not found!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Client with id=${id}`,
      });
    });
}
