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
  district.associate = function(models) {
    
  };
  return district;
};
