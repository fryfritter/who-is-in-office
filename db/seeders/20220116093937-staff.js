"use strict";

const staffArr = [
  {
    groupid: 1,
    name: "Ryan",
  },
  {
    groupid: 1,
    name: "Lit Meng",
  },
  {
    groupid: 1,
    name: "Cheng Fu",
  },
];

const staffWithTimestamp = staffArr.map((staff) => ({
  ...staff,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

console.log(staffWithTimestamp);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log("m here");
    await queryInterface.bulkInsert("staffs", staffWithTimestamp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("staffs", null, {});
  },
};
