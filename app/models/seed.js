import { sequelize } from "./index.js";

const shares = [
  {
    symbol: "RCA",
    name: "Random Company 1",
    price: 99.99,
    quantity: 1277,
  },
  {
    symbol: "RCB",
    name: "Random Company 2",
    price: 151.32,
    quantity: 1302,
  },
  {
    symbol: "RCC",
    name: "Random Company 3",
    price: 439.12,
    quantity: 2009,
  },
  {
    symbol: "RCD",
    name: "Random Company 4",
    price: 125.37,
    quantity: 12739,
  },
  {
    symbol: "RCE",
    name: "Random Company 5",
    price: 22.19,
    quantity: 75783,
  },
];

const clients = [
  {
    name: "Client Number 1",
  },
  {
    name: "Client Number 2",
  },
  {
    name: "Client Number 3",
  },
  {
    name: "Client Number 4",
  },
  {
    name: "Client Number 5",
  },
];

const portfolios = [
  {
    clientId: 1,
  },
  {
    clientId: 2,
  },
  {
    clientId: 3,
  },
  {
    clientId: 4,
  },
  {
    clientId: 5,
  },
];

const portfolioShares = [
  {
    shareId: 1,
    clientId: 1,
    portfolioId: 1,
    quantity: 20,
  },
  {
    shareId: 1,
    clientId: 2,
    portfolioId: 2,
    quantity: 43,
  },
  {
    shareId: 1,
    clientId: 3,
    portfolioId: 3,
    quantity: 52,
  },
  {
    shareId: 1,
    clientId: 4,
    portfolioId: 4,
    quantity: 33,
  },
  {
    shareId: 1,
    clientId: 5,
    portfolioId: 5,
    quantity: 12,
  },
  {
    shareId: 2,
    clientId: 1,
    portfolioId: 1,
    quantity: 102,
  },
  {
    shareId: 5,
    clientId: 2,
    portfolioId: 2,
    quantity: 37,
  },
  {
    shareId: 3,
    clientId: 3,
    portfolioId: 3,
    quantity: 92,
  },
  {
    shareId: 3,
    clientId: 4,
    portfolioId: 4,
    quantity: 72,
  },
  {
    shareId: 4,
    clientId: 5,
    portfolioId: 5,
    quantity: 84,
  },
  {
    shareId: 3,
    clientId: 1,
    portfolioId: 1,
    quantity: 5,
  },
  {
    shareId: 5,
    clientId: 1,
    portfolioId: 1,
    quantity: 29,
  },
  {
    shareId: 2,
    clientId: 2,
    portfolioId: 2,
    quantity: 69,
  },
  {
    shareId: 5,
    clientId: 3,
    portfolioId: 3,
    quantity: 11,
  },
  {
    shareId: 2,
    clientId: 5,
    portfolioId: 5,
    quantity: 28,
  },
];

const buyLogs = [
  {
    shareId: 1,
    clientId: 1,
    portfolioId: 1,
    price: 99.99,
    quantity: 20,
  },
  {
    shareId: 1,
    clientId: 2,
    portfolioId: 2,
    price: 99.99,
    quantity: 43,
  },
  {
    shareId: 1,
    clientId: 3,
    portfolioId: 3,
    price: 99.99,
    quantity: 52,
  },
  {
    shareId: 1,
    clientId: 4,
    portfolioId: 4,
    price: 99.99,
    quantity: 33,
  },
  {
    shareId: 1,
    clientId: 5,
    portfolioId: 5,
    price: 99.99,
    quantity: 12,
  },
  {
    shareId: 2,
    clientId: 1,
    portfolioId: 1,
    price: 151.32,
    quantity: 102,
  },
  {
    shareId: 5,
    clientId: 2,
    portfolioId: 2,
    price: 22.19,
    quantity: 37,
  },
  {
    shareId: 3,
    clientId: 3,
    portfolioId: 3,
    price: 439.12,
    quantity: 92,
  },
  {
    shareId: 3,
    clientId: 4,
    portfolioId: 4,
    price: 439.12,
    quantity: 72,
  },
  {
    shareId: 4,
    clientId: 5,
    portfolioId: 5,
    price: 125.37,
    quantity: 84,
  },
  {
    shareId: 3,
    clientId: 1,
    portfolioId: 1,
    price: 439.12,
    quantity: 5,
  },
  {
    shareId: 5,
    clientId: 1,
    portfolioId: 1,
    price: 22.19,
    quantity: 29,
  },
  {
    shareId: 2,
    clientId: 2,
    portfolioId: 2,
    price: 151.32,
    quantity: 69,
  },
  {
    shareId: 5,
    clientId: 3,
    portfolioId: 3,
    price: 22.19,
    quantity: 11,
  },
  {
    shareId: 2,
    clientId: 5,
    portfolioId: 5,
    price: 151.32,
    quantity: 28,
  },
];

const sellLogs = [
  {
    shareId: 1,
    clientId: 1,
    portfolioId: 1,
    price: 99.99,
    quantity: 20,
  },
  {
    shareId: 1,
    clientId: 2,
    portfolioId: 2,
    price: 99.99,
    quantity: 43,
  },
  {
    shareId: 1,
    clientId: 3,
    portfolioId: 3,
    price: 99.99,
    quantity: 52,
  },
  {
    shareId: 1,
    clientId: 4,
    portfolioId: 4,
    price: 99.99,
    quantity: 33,
  },
  {
    shareId: 1,
    clientId: 5,
    portfolioId: 5,
    price: 99.99,
    quantity: 12,
  },
];

const priceLogs = [
  {
    shareId: 1,
    price: 99.99,
  },
  {
    shareId: 2,
    price: 151.32,
  },
  {
    shareId: 3,
    price: 439.12,
  },
  {
    shareId: 4,
    price: 125.37,
  },
  {
    shareId: 5,
    price: 22.19,
  },
];

async function seedModel(modelName, seedData) {
  try {
    await sequelize.models[modelName].bulkCreate(seedData);
    console.log(`${modelName} seed data added successfully.`);
  } catch (error) {
    console.error(error);
  }
}

export async function seed() {
  await seedModel("share", shares);
  await seedModel("client", clients);
  await seedModel("portfolio", portfolios);
  await seedModel("portfolio_share", portfolioShares);
  await seedModel("buy_log", buyLogs);
  await seedModel("sell_log", sellLogs);
  await seedModel("price_log", priceLogs);
}
