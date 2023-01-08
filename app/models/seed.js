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

async function seedModel(modelName, seedData) {
  try {
    await sequelize.models[modelName].bulkCreate(seedData);
    console.log(`${modelName} seed data added successfully.`);
  } catch(error) {
    console.error(error);
  }
}

export async function seed() {
  await seedModel('share', shares);
}
