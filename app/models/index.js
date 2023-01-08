import { dbConfig } from "../config/db.config.js";
import Sequelize from "sequelize";
import Share from "./share/share.model.js";
import Client from "./client/client.model.js";
import Portfolio from "./portfolio/portfolio.model.js";
import PortfolioShare from "./portfolio-share/portfolio-share.model.js";
import BuyLog from "./buy-log/buy-log.model.js";
import SellLog from "./sell-log/sell-log.model.js";
import PriceLog from "./price-log/price-log.model.js";

export const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {
  Sequelize,
  sequelize,
  shares: Share(sequelize, Sequelize),
  clients: Client(sequelize, Sequelize),
  portfolios: Portfolio(sequelize, Sequelize),
  portfolioShares: PortfolioShare(sequelize, Sequelize),
  buyLogs: BuyLog(sequelize, Sequelize),
  sellLogs: SellLog(sequelize, Sequelize),
  priceLogs: PriceLog(sequelize, Sequelize),
};

export default db;
