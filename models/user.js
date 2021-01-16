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
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    user.hasMany(models.watchlist, {
      onDelete: "cascade",
    });
  };

  return user;
};
