module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      username: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastname:{
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isAdmin: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },

    {
      tableName: "user",
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Bill, { foreignKey: "user_id" });
  };

  return User;
};
