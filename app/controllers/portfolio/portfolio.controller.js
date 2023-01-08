import db from "../../models/index.js";

const Portfolio = db.portfolios;
const Op = db.Sequelize.Op;

// Get a single Portfolio with id
export function getOne(req, res) {
  const id = req.params.id;

  Portfolio.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Portfolio with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Portfolio with id=${id}`,
      });
    });
}

// Get all Portfolio from the database
export function getAll(req, res) {
  Portfolio.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Portfolios.",
      });
    });
}

// Create Portfolio
export function createOne(req, res) {
  if (!req.body.clientId) {
    res.status(400).send({
      message: "Body can not be empty.",
    });
    return;
  }

  const portfolio = {
    clientId: req.body.clientId,
  };

  Portfolio.create(portfolio)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Portfolio.",
      });
    });
}

// Delete one Portfolio with id
export function deleteOne(req, res) {
  const id = req.params.id;

  Portfolio.destroy({
    where: { id },
  })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "Portfolio was deleted successfully!",
        });

        return;
      }

      res.send({
        message: `Cannot delete Portfolio with id=${id}. Maybe Portfolio was not found!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Portfolio with id=${id}`,
      });
    });
}
