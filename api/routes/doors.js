const router = require("express").Router();

const Door = require("../models/Door");

router.get("/", async (req, res) => {
  try {
    const door = await Door.find().sort({ createdAt: -1 }).limit(1);
    res.status(200).json(door);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/open", async (req, res) => {
  try {
    const newDoor = new Door({
      isClosed: false,
    });
    const door = await newDoor.save();
    res.status(200).json(door);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/close", async (req, res) => {
  try {
    const newDoor = new Door({
      isClosed: true,
    });
    const door = await newDoor.save();
    res.status(200).json(door);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
