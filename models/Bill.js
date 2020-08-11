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
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      end_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      amout: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      total: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },

    {
      tableName: "bill",
    }
  );

  Bill.associate = (models) => {
    Bill.belongsTo(models.User, { foreignKey: "user_id" });
    Bill.belongsTo(models.Car, { foreignKey: "car_number" });
  };

  return  Bill;
};
