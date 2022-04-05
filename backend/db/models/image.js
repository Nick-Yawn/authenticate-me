'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    spot_id: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    underscored: true,
  });
  Image.associate = function(models) {
    Image.belongsTo(models.Spot, { foreignKey: 'spot_id'});
  };
  return Image;
};
