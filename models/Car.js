module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "Car",
    {
      car_number: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      car_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      car_brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      picture:{
        type:DataTypes.STRING,
      }
    },

    {
      tableName: "Car",
    }
  );

  Car.associate = (models) => {
    Car.hasMany(models.Bill, { foreignKey: "car_number" });
  };

  return Car;
};
