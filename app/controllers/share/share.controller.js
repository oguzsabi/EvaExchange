import moment from "moment/moment.js";
import db from "../../models/index.js";
const Share = db.shares;
const Op = db.Sequelize.Op;

// Get a single Share with id
export async function getOne(req, res) {
  const id = req.params.id;
  const data = await findOneByPk(id);

  if (data === null) {
    res.status(404).send({
      message: `Cannot find Share with id=${id}.`,
    });

    return;
  }

  if (data === undefined) {
    res.status(500).send({
      message: err.message || `Error retrieving Share with id=${id}`,
    });

    return;
  }

  res.send(data);
}

// Get all Shares from the database
export function getAll(req, res) {
  Share.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving shares.",
      });
    });
}

// Create share
export function createOne(req, res) {
  if (!req.body.symbol) {
    res.status(400).send({
      message: "Body can not be empty.",
    });
  }

  const share = {
    symbol: req.body.symbol,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  Share.create(share)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Share.",
      });
    });
}

// Update one share with id
export async function updateOne(req, res) {
  const id = req.params.id;
  const isPriceUpdate = req.body.hasOwnProperty("price");
  const nowInUtc = moment.utc();

  if (isPriceUpdate) {
    const share = await findOneByPk(id);
    const priceLastUpdatedAt = moment(share.priceLastUpdatedAt);

    if (nowInUtc.clone().subtract(1, "hour").isBefore(priceLastUpdatedAt)) {
      res.status(500).send({
        message: `Prices can only be updated on an hourly basis. Next update can be made at ${priceLastUpdatedAt
          .add(1, "hour")
          .format("YYYY-MM-DD HH:mm:ss")}`,
      });

      return;
    }
  }

  const updateData = {
    ...req.body,
    ...(isPriceUpdate ? { priceLastUpdatedAt: nowInUtc } : {}),
  };

  Share.update(updateData, { where: { id } })
    .then((result) => {
      if (Array.isArray(result) && result[0] === 1) {
        res.send({
          message: "Share was updated successfully.",
        });

        return;
      }

      res.send({
        message: `Cannot update Share with id=${id}. Maybe Share was not found or req.body is empty!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Share with id=${id}`,
      });
    });
}

// Delete one share with id
export function deleteOne(req, res) {
  const id = req.params.id;

  Share.destroy({
    where: { id },
  })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "Share was deleted successfully!",
        });

        return;
      }

      res.send({
        message: `Cannot delete Share with id=${id}. Maybe Share was not found!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Share with id=${id}`,
      });
    });
}

async function findOneByPk(id) {
  try {
    return await Share.findByPk(id);
  } catch (err) {
    return undefined;
  }
}
