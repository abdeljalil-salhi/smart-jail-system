const handleRequest = require("../utils/request");
const Alarm = require("../models/alarm");

const postAlarms = handleRequest(async (body) => {
  const newAlarm = new Alarm({
    prisonerID: "5454545",
    text: "A prisoner is trying to escape!",
    alarmType: "escape",
  });
  return await newAlarm.save();
});

const getAlarms = handleRequest(async () => {
  const alarms = await Alarm.find();
  return alarms;
});

const getAlarmsById = handleRequest(async (body, id) => {
  const alarm = await Alarm.findById(id);
  if (!alarm) throw new Error(`Alarm ${id} not found...`);
  return alarm;
});

const deleteAlarmsById = handleRequest(async (body, id) => {
  const deleted = await Alarm.findByIdAndDelete(id);
  if (!deleted) throw new Error(`Alarm ${id} not found...`);
  return `Alarm ${id} has been deleted...`;
});

const deleteAlarms = handleRequest(async () => {
  const deleted = await Alarm.deleteMany();
  if (!deleted) throw new Error("No alarms found...");
  return deleted;
});

module.exports = {
  postAlarms,
  getAlarms,
  getAlarmsById,
  deleteAlarmsById,
  deleteAlarms,
};
