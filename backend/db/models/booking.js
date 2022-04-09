'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    user_id: DataTypes.INTEGER,
    spot_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    validate: {
      endDateAfterStartDate() {
        if( this.startDate > this.endDate ){
          throw new Error('End Date must be later than Start Date.');
        }
      }
    },
    underscored: true,
    paranoid: true
  });
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, { foreignKey: 'user_id'});
    Booking.belongsTo(models.Spot, { foreignKey: 'spot_id'});
  };
  return Booking;
};
