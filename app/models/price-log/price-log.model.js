export default (sequelize, Sequelize) => {
  const PriceLog = sequelize.define("price_log", {
    shareId: {
      type: Sequelize.INTEGER,
      references: {
        model: "shares",
        key: "id",
      },
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(1000, 2).UNSIGNED,
      allowNull: false,
    },
  });

  return PriceLog;
};
