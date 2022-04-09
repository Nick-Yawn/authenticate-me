'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    spot_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    body: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        isBetweenZeroAndFive(value){
          if( value > 5 || value < 0 ){
            throw new Error('Rating must be between 0 and 5, inclusive.');
          }
        }
      }
    }
  }, {
    underscored: true,
    paranoid: true
  });
  Review.associate = function(models) {
    Review.belongsTo(models.User, {foreignKey: 'user_id'});
    Review.belongsTo(models.Spot, {foreignKey: 'spot_id'});
  };
  return Review;
};
