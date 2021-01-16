module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("user", {
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,30]
        }
      }
    });
  
    Post.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Post.belongsTo(models.watchlist, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Post;
  };