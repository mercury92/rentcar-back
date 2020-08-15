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
        type: DataTypes.DATE,
      },
      end_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      total: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status:{
        allowNull: false,
        type: DataTypes.STRING,
      }
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
