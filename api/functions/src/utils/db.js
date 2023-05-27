const mongoose = require("mongoose");

const connect = async (_client) => {
  if (!_client) {
    mongoose.set("strictQuery", false);
    _client = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  return _client;
};

const close = async (_client) => {
  if (_client) {
    await _client.disconnect();
    _client = null;
  }
};

module.exports = {
  connect,
  close,
};
