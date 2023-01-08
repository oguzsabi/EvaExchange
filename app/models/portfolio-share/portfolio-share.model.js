export default (sequelize, Sequelize) => {
  const PortfolioShare = sequelize.define(
    "portfolio_share",
    {
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
      quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      indexes: [{ fields: ["shareId", "clientId", "portfolioId"], unique: true }],
    }
  );

  return PortfolioShare;
};
