const router = require("express").Router();

const General = require("../models/General");

router.get("/doors", async (req, res) => {
  try {
    const general = await General.find();
    res.status(200).json(general[0].doorsClosed);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/open", async (req, res) => {
  try {
    const general = await General.find();
    if (!general) {
      const newGeneral = new General({
        doorsClosed: false,
      });
      general[0] = await newGeneral.save();
    }
    if (general[0].doorsClosed === false)
      return res.status(200).json(general[0].doorsClosed);
    general[0].doorsClosed = false;
    await general[0].save();
    res.status(200).json(general[0].doorsClosed);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/close", async (req, res) => {
  try {
    const general = await General.find();
    if (!general) {
      const newGeneral = new General({
        doorsClosed: true,
      });
      general[0] = await newGeneral.save();
    }
    if (general[0].doorsClosed === true)
      return res.status(200).json(general[0].doorsClosed);
    general[0].doorsClosed = true;
    await general[0].save();
    res.status(200).json(general[0].doorsClosed);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
