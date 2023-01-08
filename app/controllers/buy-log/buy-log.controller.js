import db from "../../models/index.js";

const BuyLog = db.buyLogs;
const Op = db.Sequelize.Op;

// Get a single BuyLog with id
export function getOne(req, res) {
  const id = req.params.id;

  BuyLog.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find BuyLog with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving BuyLog with id=${id}`,
      });
    });
}

// Get all BuyLogs from the database
export function getAll(req, res) {
  BuyLog.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving BuyLogs.",
      });
    });
}
