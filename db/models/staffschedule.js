'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class staffSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  staffSchedule.init({
    staffId: DataTypes.INTEGER,
    officeOn: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'staffSchedule',
  });
  return staffSchedule;
};