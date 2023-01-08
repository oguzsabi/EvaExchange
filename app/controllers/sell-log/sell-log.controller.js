import db from "../../models/index.js";

const SellLog = db.sellLogs;
const Op = db.Sequelize.Op;

// Get a single SellLog with id
export function getOne(req, res) {
  const id = req.params.id;

  SellLog.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find SellLog with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving SellLog with id=${id}`,
      });
    });
}

// Get all SellLogs from the database
export function getAll(req, res) {
  SellLog.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SellLogs.",
      });
    });
}
