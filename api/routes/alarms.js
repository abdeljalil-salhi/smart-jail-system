const router = require("express").Router();

const Alarm = require("../models/Alarm");

router.post("/new/escape", async (req, res) => {
  try {
    const newAlarm = new Alarm({
      prisonerID: "5454545",
      alarmType: "ESCAPE",
      text: "Prisoner 5454545 is trying to escape!",
    });
    const alarm = await newAlarm.save();
    res.status(200).json(alarm);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/new/flame", async (req, res) => {
  try {
    const newAlarm = new Alarm({
      prisonerID: "Staff",
      alarmType: "FLAME",
      text: "Fire detected in the prison!",
    });
    const alarm = await newAlarm.save();
    res.status(200).json(alarm);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/new/gas", async (req, res) => {
  try {
    const newAlarm = new Alarm({
      prisonerID: "Staff",
      alarmType: "GAS",
      text: "Gas detected in the prison!",
    });
    const alarm = await newAlarm.save();
    res.status(200).json(alarm);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const alarm = await Alarm.findById(req.params.id);
    res.status(200).json(alarm);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const alarms = await Alarm.find();
    res.status(200).json(alarms);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const alarm = await Alarm.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    if (!alarm)
      return res.status(404).json(`Alarm ${req.params.id} not found...`);
    res.status(200).json(alarm);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Alarm.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json(`Alarm ${req.params.id} not found...`);
    res.status(200).json(`Alarm ${req.params.id} has been deleted...`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    const deleted = await Alarm.deleteMany();
    if (!deleted) return res.status(404).json(`Alarms not found...`);
    res.status(200).json(`Alarms have been deleted...`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
