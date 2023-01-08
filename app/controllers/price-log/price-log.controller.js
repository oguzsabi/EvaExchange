import db from "../../models/index.js";

const PriceLog = db.priceLogs;
const Op = db.Sequelize.Op;

// Get a single PriceLog with id
export function getOne(req, res) {
  const id = req.params.id;

  PriceLog.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PriceLog with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving PriceLog with id=${id}`,
      });
    });
}

// Get all PriceLogs from the database
export function getAll(req, res) {
  PriceLog.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving PriceLogs.",
      });
    });
}
