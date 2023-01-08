import PortfolioShare from "../portfolio-share/portfolio-share.model.js";
import BuyLog from "../buy-log/buy-log.model.js";
import SellLog from "../sell-log/sell-log.model.js";
import PriceLog from "../price-log/price-log.model.js";

export default (sequelize, Sequelize) => {
  const Share = sequelize.define("share", {
    symbol: {
      type: Sequelize.CHAR(3),
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(1000, 2).UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    priceLastUpdatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  });

  Share.hasMany(PortfolioShare(sequelize, Sequelize));
  Share.hasMany(BuyLog(sequelize, Sequelize));
  Share.hasMany(SellLog(sequelize, Sequelize));
  Share.hasMany(PriceLog(sequelize, Sequelize));

  return Share;
};
