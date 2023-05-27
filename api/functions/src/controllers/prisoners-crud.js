const handleRequest = require("../utils/request");
const Prisoner = require("../models/prisoner");

const postPrisoners = handleRequest(async (body) => {
  const newPrisoner = new Prisoner(body);
  return await newPrisoner.save();
});

const getPrisoners = handleRequest(async () => {
  const prisoners = await Prisoner.find();
  return prisoners;
});

const getPrisonersById = handleRequest(async (body, id) => {
  const prisoner = await Prisoner.findById(id);
  if (!prisoner) throw new Error(`Prisoner ${id} not found...`);
  return prisoner;
});

const deletePrisonersById = handleRequest(async (body, id) => {
  const deleted = await Prisoner.findByIdAndDelete(id);
  if (!deleted) throw new Error(`Prisoner ${id} not found...`);
  return `Prisoner ${id} has been deleted...`;
});

const deletePrisoners = handleRequest(async () => {
  const deleted = await Prisoner.deleteMany();
  if (!deleted) throw new Error("No prisoners found...");
  return deleted;
});

module.exports = {
  postPrisoners,
  getPrisoners,
  getPrisonersById,
  deletePrisonersById,
  deletePrisoners,
};
