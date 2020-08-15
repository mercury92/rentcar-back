module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "Car",
    {
      car_id: {
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
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      available: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      tableName: "Car",
    }
  );

  Car.associate = (models) => {
    Car.hasMany(models.Bill, { foreignKey: "car_id" });
  };

  return Car;
};
