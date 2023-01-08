export default (sequelize, Sequelize) => {
  const BuyLog = sequelize.define("buy_log", {
    shareId: {
      type: Sequelize.INTEGER,
      references: {
        model: "shares",
        key: "id",
      },
      allowNull: false,
    },
    clientId: {
      type: Sequelize.INTEGER,
      references: {
        model: "clients",
        key: "id",
      },
      allowNull: false,
    },
    portfolioId: {
      type: Sequelize.INTEGER,
      references: {
        model: "portfolios",
        key: "id",
      },
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
  });

  return BuyLog;
};
