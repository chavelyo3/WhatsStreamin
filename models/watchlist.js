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
    watchlist.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return watchlist;
};
