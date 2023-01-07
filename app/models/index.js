import { dbConfig } from "../config/db.config.js";
import Sequelize from "sequelize";
import Share from "./share/share.model.js";

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
};

export default db;
