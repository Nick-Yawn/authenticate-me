'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotAmenity = sequelize.define('SpotAmenity', {
    spotId: DataTypes.INTEGER,
    amenityId: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  SpotAmenity.associate = function(models) {
 
  };
  return SpotAmenity;
};
