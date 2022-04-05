'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    name: DataTypes.STRING,
    iconClass: DataTypes.STRING
  }, {
    underscored: true,
  });
  Amenity.associate = function(models) {
    Amenity.belongsToMany(models.Spot, {
      through: 'spot_amenities',
      otherKey: 'spot_id',
      foreignKey: 'amenity_id'
    }); 
    Amenity.hasMany(models.SpotAmenity, {
      foreignKey: 'amenity_id'
    });
  };
  return Amenity;
};
