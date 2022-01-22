"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StaffSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StaffSchedule.init(
    {
      staffId: DataTypes.INTEGER,
      officeOn: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "staffSchedule",
      tableName: "staffSchedules",
    }
  );
  return StaffSchedule;
};
