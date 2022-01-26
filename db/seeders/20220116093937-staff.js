"use strict";

const staffArr = [
  {
    groupid: 1,
    name: "Abel Tay",
  },
  {
    groupid: 1,
    name: "Ahmad",
  },
  {
    groupid: 1,
    name: "Andy Chan",
  },
  {
    groupid: 1,
    name: "Anne Seow",
  },
  {
    groupid: 1,
    name: "Benny Ou",
  },
  {
    groupid: 1,
    name: "Beryl Kwok",
  },
  {
    groupid: 1,
    name: "Brian",
  },
  {
    groupid: 1,
    name: "Charles Lim",
  },
  {
    groupid: 1,
    name: "Delon Wong",
  },
  {
    groupid: 1,
    name: "Edward Soetiono",
  },
  {
    groupid: 1,
    name: "Elky Li",
  },
  {
    groupid: 1,
    name: "Emily Ong",
  },
  {
    groupid: 1,
    name: "Eugene Ang",
  },
  {
    groupid: 1,
    name: "Evelyn Lee",
  },
  {
    groupid: 1,
    name: "Gerald Neo",
  },
  {
    groupid: 1,
    name: "Gerald Png",
  },
  {
    groupid: 1,
    name: "Grace Chan",
  },
  {
    groupid: 1,
    name: "Eric Ho",
  },
  {
    groupid: 1,
    name: "Andy Hong",
  },
  {
    groupid: 1,
    name: "Howard Liu",
  },
  {
    groupid: 1,
    name: "Jacky Lian",
  },
  {
    groupid: 1,
    name: "Jaspal Kaur",
  },
  {
    groupid: 1,
    name: "Jermyn",
  },
  {
    groupid: 1,
    name: "John Lee",
  },
  {
    groupid: 1,
    name: "Johnny Lim",
  },
  {
    groupid: 1,
    name: "Jonathan Chiam",
  },
  {
    groupid: 1,
    name: "Jordan Chong",
  },
  {
    groupid: 1,
    name: "Jordyn",
  },
  {
    groupid: 1,
    name: "Kaiyi",
  },
  {
    groupid: 1,
    name: "Khoo Yong Kang",
  },
  {
    groupid: 1,
    name: "Koh Wai Kit",
  },
  {
    groupid: 1,
    name: "Krish",
  },
  {
    groupid: 1,
    name: "Larry",
  },
  {
    groupid: 1,
    name: "Lee Chiang Fong",
  },
  {
    groupid: 1,
    name: "Lee Liak Wee",
  },
  {
    groupid: 1,
    name: "Li Xiaofeng",
  },
  {
    groupid: 1,
    name: "Liau Wen Rui",
  },
  {
    groupid: 1,
    name: "Lit Meng",
  },
  {
    groupid: 1,
    name: "Melody Lee",
  },
  {
    groupid: 1,
    name: "Melvin Loo",
  },
  {
    groupid: 1,
    name: "Naomi Leow",
  },
  {
    groupid: 1,
    name: "Ning Yu",
  },
  {
    groupid: 1,
    name: "Ryan Zhuang",
  },
  {
    groupid: 1,
    name: "Selwyn Yeow",
  },
  {
    groupid: 1,
    name: "Si Hao",
  },
  {
    groupid: 1,
    name: "Soh Wei Cheng",
  },
  {
    groupid: 1,
    name: "Soh Yu Ming",
  },
  {
    groupid: 1,
    name: "Sophie Wang",
  },
  {
    groupid: 1,
    name: "Tan Wei Lin Faith",
  },
  {
    groupid: 1,
    name: "Tan Ying Ling",
  },
  {
    groupid: 1,
    name: "Teo ShaoWei",
  },
  {
    groupid: 1,
    name: "Wayne Chong",
  },
  {
    groupid: 1,
    name: "Wee Chien",
  },
  {
    groupid: 1,
    name: "Yeo Cheng Fu",
  },
  {
    groupid: 1,
    name: "Yu Jianshu",
  },
  {
    groupid: 1,
    name: "Zavier Lim",
  },
  {
    groupid: 1,
    name: "Zheng Yuan",
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
