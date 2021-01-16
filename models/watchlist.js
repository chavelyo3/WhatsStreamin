module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("watchlist", {
      movie_title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,50]
        }
      },
      netflix: {
          type: DataTypes.BOOLEAN,
          allowNull: false
      }
    });
  
    Post.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Post.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return watchlist;
  };