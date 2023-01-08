import db from "../../models/index.js";

const PortfolioShare = db.portfolioShares;
const Op = db.Sequelize.Op;

// Get a single PortfolioShare with id
export function getOne(req, res) {
  const id = req.params.id;

  PortfolioShare.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PortfolioShare with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving PortfolioShare with id=${id}`,
      });
    });
}

// Get all PortfolioShares from the database
export function getAll(req, res) {
  PortfolioShare.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving PortfolioShares.",
      });
    });
}
