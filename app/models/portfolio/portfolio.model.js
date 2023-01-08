import PortfolioShare from "../portfolio-share/portfolio-share.model.js";
import BuyLog from "../buy-log/buy-log.model.js";
import SellLog from "../sell-log/sell-log.model.js";

export default (sequelize, Sequelize) => {
  const Portfolio = sequelize.define(
    "portfolio",
    {
      clientId: {
        type: Sequelize.INTEGER,
        references: {
          model: "clients",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      indexes: [
        { fields: ["clientId"], unique: true },
      ],
    }
  );

  Portfolio.hasMany(PortfolioShare(sequelize, Sequelize));
  Portfolio.hasMany(BuyLog(sequelize, Sequelize));
  Portfolio.hasMany(SellLog(sequelize, Sequelize));

  return Portfolio;
};
