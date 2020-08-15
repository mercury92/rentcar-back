module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define(
    "Bill",
    {
      bill_no: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amout: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      tableName: "bill",
    }
  );

  Bill.associate = (models) => {
    Bill.belongsTo(models.User, { foreignKey: "user_id" });
    Bill.belongsTo(models.Car, { foreignKey: "car_id" });
  };

  return Bill;
};
