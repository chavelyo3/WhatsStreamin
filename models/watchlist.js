module.exports = function(sequelize, DataTypes) {
  const watchlist = sequelize.define(
    "watchlist",
    {
      // eslint-disable-next-line camelcase
      movie_title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
      netflix: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    { freezeTableName: true }
  );

  watchlist.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    watchlist.belongsTo(models.user, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return watchlist;
};
