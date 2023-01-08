export default (sequelize, Sequelize) => {
  const Share = sequelize.define("share", {
    symbol: {
      type: Sequelize.CHAR(3),
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.CHAR(100),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(1000,2),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    priceLastUpdatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
  });

  return Share;
};
