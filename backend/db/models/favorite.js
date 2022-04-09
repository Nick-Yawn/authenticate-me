'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('Favorite', {
    user_id: DataTypes.INTEGER,
    spot_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  favorite.associate = function(models) {
    // associations can be defined here
  };
  return favorite;
};
