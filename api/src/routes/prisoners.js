const router = require("express").Router();

const Prisoner = require("../models/Prisoner");

router.post("/new", async (req, res) => {
  try {
    const newPrisoner = new Prisoner(req.body);
    const prisoner = await newPrisoner.save();
    res.status(200).json(prisoner);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const prisoner = await Prisoner.findById(req.params.id);
    res.status(200).json(prisoner);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const prisoners = await Prisoner.find();
    res.status(200).json(prisoners);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const prisoner = await Prisoner.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    if (!prisoner)
      res.status(404).json(`Prisoner ${req.params.id} not found...`);
    res.status(200).json(prisoner);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Prisoner.findByIdAndDelete(req.params.id);
    if (!deleted)
      res.status(404).json(`Prisoner ${req.params.id} not found...`);
    res.status(200).json(`Prisoner ${req.params.id} has been deleted...`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
