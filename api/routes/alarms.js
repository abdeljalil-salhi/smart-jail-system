const router = require("express").Router();

const Alarm = require("../models/alarm");

router.post("/new", async (req, res) => {
  try {
    const newAlarm = new Alarm(req.body);
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
		res.status(404).json(`Alarm ${req.params.id} not found...`);
    res.status(200).json(alarm);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Alarm.findByIdAndDelete(req.params.id);
    if (!deleted) res.status(404).json(`Alarm ${req.params.id} not found...`);
    res.status(200).json(`Alarm ${req.params.id} has been deleted...`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
