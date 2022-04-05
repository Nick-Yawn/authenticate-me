'use strict';
module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define('District', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, 
  {
    underscored: true
  });
  District.associate = function(models) {
    District.hasMany(models.Spot, {
      foreignKey: 'district_id'
    })
  };
  return District;
};
