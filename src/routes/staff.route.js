const express = require("express");
const router = express.Router();
const db = require("../../db/models/index");

router.get("/staffList", async (req, res) => {
  try {
    console.log("Staff Route Get all");
    const staff = await db.staff.findAll({
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["name"],
      ],
      attributes: ["name", "id"],
    });
    res.json(staff);
  } catch (err) {
    console.error(err);
    // next(err);
  }
});

router.get("/staffSchedule", async (req, res) => {
  try {
    console.log("Staff schedule Get all");
    const staffSchedule = await db.staffSchedule.findAll({
      attributes: ["staffId", "officeOn"],
    });
    res.json(staffSchedule);
  } catch (err) {
    console.error(err);
    // next(err);
  }
});

router.post("/addSchedule", async (req, res, next) => {
  try {
    console.log("m calling add schedule");
    const { staffId, officeOn } = req.body;
    const staSchedule = { staffId, officeOn };
    await db.staffSchedule.create(staSchedule);
    res.json({ result: true });
  } catch (err) {
    next(err);
  }
});

router.post("/deleteSchedule", async (req, res, next) => {
  try {
    const { staffId, officeOn } = req.body;
    console.log("m calling delete schedule");
    db.staffSchedule.destroy({
      where: {
        staffId,
        officeOn,
      },
    });

    res.json({ result: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
