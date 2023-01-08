import Portfolio from "../portfolio/portfolio.model.js";
import PortfolioShare from "../portfolio-share/portfolio-share.model.js";
import BuyLog from "../buy-log/buy-log.model.js";
import SellLog from "../sell-log/sell-log.model.js";

export default (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  Client.hasMany(Portfolio(sequelize, Sequelize));
  Client.hasMany(PortfolioShare(sequelize, Sequelize));
  Client.hasMany(BuyLog(sequelize, Sequelize));
  Client.hasMany(SellLog(sequelize, Sequelize));

  return Client;
};
