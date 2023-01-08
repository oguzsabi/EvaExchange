import moment from "moment/moment.js";
import db from "../../models/index.js";

const Share = db.shares;
const PriceLog = db.priceLogs;
const Client = db.clients;
const Portfolio = db.portfolios;
const PortfolioShare = db.portfolioShares;
const BuyLog = db.buyLogs;
const SellLog = db.sellLogs;
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

    return;
  }

  const share = {
    symbol: req.body.symbol,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  if (share.price <= 0) {
    res.status(400).send({
      message: "Price must be a positive number.",
    });

    return;
  }

  Share.create(share)
    .then(async (data) => {
      await PriceLog.create({ shareId: data.id, price: data.price });
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
  const body = req.body;
  const isPriceUpdate = body.hasOwnProperty("price");
  const isSymbolUpdate = body.hasOwnProperty("symbol");
  const nowInUtc = moment.utc();
  const share = await findOneByPk(id);
  const symbolRegEx = /^[a-z]+$/i;

  if (isPriceUpdate) {
    const priceLastUpdatedAt = moment(share.priceLastUpdatedAt);

    if (nowInUtc.clone().subtract(1, "hour").isBefore(priceLastUpdatedAt)) {
      res.status(400).send({
        message: `Prices can only be updated on an hourly basis. Next update can be made at ${priceLastUpdatedAt
          .add(1, "hour")
          .format("YYYY-MM-DD HH:mm:ss")}`,
      });

      return;
    }

    if (body.price <= 0) {
      res.status(400).send({
        message: "Price must be a positive number.",
      });

      return;
    }
  }

  if (
    isSymbolUpdate &&
    (body.symbol.length !== 3 || !symbolRegEx.test(body.symbol))
  ) {
    res.status(400).send({
      message: "Share symbols must be exactly 3 letters.",
    });

    return;
  }

  const updateData = {
    ...(body.symbol ? { symbol: body.symbol } : {}),
    ...(body.name ? { name: body.name } : {}),
    ...(body.price ? { price: body.price } : {}),
    ...(body.quantity ? { quantity: body.quantity } : {}),
    ...(isPriceUpdate ? { priceLastUpdatedAt: nowInUtc } : {}),
  };

  Share.update(updateData, { where: { id } })
    .then(async (result) => {
      if (Array.isArray(result) && result[0] === 1) {
        if (isPriceUpdate) {
          await PriceLog.create({ shareId: id, price: body.price });
        }

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

// Buy share
export async function buyOne(req, res) {
  const shareId = req.body.shareId;
  const clientId = req.body.clientId;
  const quantity = req.body.quantity;

  const [share, client] = await validateBuySellBody(
    shareId,
    clientId,
    quantity
  );

  if (!share || !client) {
    return;
  }

  const remainingShareQuantity = share.quantity - quantity;

  if (remainingShareQuantity < 0) {
    res.status(400).send({
      message: `Desired quantity cannot be bought because the remaining quantity is ${share.quantity}.`,
    });

    return;
  }

  Share.update(
    { quantity: remainingShareQuantity },
    {
      where: { id: shareId },
    }
  )
    .then(async (result) => {
      if (Array.isArray(result) && result[0] === 1) {
        const portfolioShareWhereObject = {
          where: { shareId, clientId, portfolioId: client.portfolio.id },
        };
        const portfolioShare = await PortfolioShare.findAll(
          portfolioShareWhereObject
        );

        if (portfolioShare[0]) {
          await PortfolioShare.update(
            { quantity: portfolioShare[0].quantity + quantity },
            portfolioShareWhereObject
          );
        } else {
          await PortfolioShare.create({
            ...portfolioShareWhereObject.where,
            quantity,
          });
        }

        await BuyLog.create({
          ...portfolioShareWhereObject.where,
          quantity,
          price: share.price,
        });

        res.send({
          message: "Share was bought successfully!",
        });

        return;
      }

      res.send({
        message: `Cannot buy Share with id=${shareId}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not buy Share with id=${shareId}`,
      });
    });
}

// Sell share
export async function sellOne(req, res) {
  const shareId = req.body.shareId;
  const clientId = req.body.clientId;
  const quantity = req.body.quantity;

  const [share, client] = await validateBuySellBody(
    shareId,
    clientId,
    quantity
  );

  if (!share || !client) {
    return;
  }

  const portfolioShareWhereObject = {
    where: { shareId, clientId, portfolioId: client.portfolio.id },
  };
  const portfolioShare = await PortfolioShare.findAll(
    portfolioShareWhereObject
  );

  if (!portfolioShare[0]) {
    res.status(400).send({
      message: `Desired client does not have the desired share in their portfolio.`,
    });

    return;
  }

  const remainingPortfolioShareQuantity = portfolioShare[0].quantity - quantity;

  if (remainingPortfolioShareQuantity < 0) {
    res.status(400).send({
      message: `Desired quantity cannot be sold because the desired client's remaining quantity is ${share.quantity}.`,
    });

    return;
  }

  Share.update(
    { quantity: share.quantity + quantity },
    {
      where: { id: shareId },
    }
  )
    .then(async (result) => {
      if (Array.isArray(result) && result[0] === 1) {
        if (remainingPortfolioShareQuantity === 0) {
          await PortfolioShare.destroy({
            where: { id: portfolioShare[0].id },
          });
        } else {
          await PortfolioShare.update(
            { quantity: remainingPortfolioShareQuantity },
            portfolioShareWhereObject
          );
        }

        await SellLog.create({
          ...portfolioShareWhereObject.where,
          quantity,
          price: share.price,
        });

        res.send({
          message: "Share was sold successfully!",
        });

        return;
      }

      res.send({
        message: `Cannot sell Share with id=${shareId}.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not sell Share with id=${shareId}`,
      });
    });
}

async function validateBuySellBody(shareId, clientId, quantity) {
  if (
    !shareId ||
    !clientId ||
    !quantity ||
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    res.status(400).send({
      message:
        "Incorrect body. Please make sure the required share, user, and quantity information is set correctly.",
    });

    return [null, null];
  }

  const share = await findOneByPk(shareId);
  const client = await Client.findByPk(clientId, { include: Portfolio });

  if (!share) {
    res.status(400).send({
      message: "Desired share must exist.",
    });

    return [null, null];
  }

  if (!client.portfolio) {
    res.status(400).send({
      message: "Desired client must have a portfolio.",
    });

    return [null, null];
  }

  return [share, client];
}
