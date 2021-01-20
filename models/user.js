module.exports = function(sequelize, DataTypes) {
  let user = sequelize.define(
    "user",
    {
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30],
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        default: Date.now(),
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { freezeTableName: true }
  );

  user.associate = function(models) {
    user.hasMany(models.watchlist, {
      onDelete: "cascade",
    });
  };

  return user;
};
