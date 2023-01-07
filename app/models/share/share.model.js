export default (sequelize, Sequelize) => {
  const Share = sequelize.define("share", {
    symbol: {
      type: Sequelize.CHAR(3),
    },
    name: {
      type: Sequelize.CHAR(100),
    },
    price: {
      type: Sequelize.DECIMAL(1000,2),
    },
    quantity: {
      type: Sequelize.BIGINT,
    },
  });

  return Share;
};
