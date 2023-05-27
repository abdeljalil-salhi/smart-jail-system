const { connect, close } = require("./db");
const Status = require("./status");
const controllers = require("../controllers/index");

let _client;
exports.handler = async (event) => {
  let { httpMethod, path, body } = event;
  const { controller, method, id } = getControllerAndMethod(path, httpMethod);

  if (!controller) return Status.NotFound();
  if (!method) return Status.Error("Method Not Allowed", 405);
  if (body) body = JSON.parse(body);

  try {
    await connect(_client);
    return await controller[method](body, id);
  } finally {
    await close(_client);
  }
};

const PATH_REGEX = /^\/(\w+)(?:\/(\w+))?/;

const getControllerAndMethod = (path, httpMethod) => {
  const [, resource, id] = path.replace("/api", "").match(PATH_REGEX);
  const controller = controllers[`${resource}Controller`];

  if (!controller) {
    return {
      controller: undefined,
      method: undefined,
    };
  }

  const method = `${httpMethod.toLowerCase()}${resource[0].toUpperCase()}${resource.slice(
    1
  )}`;

  if (id) {
    return {
      controller,
      method: method + "ById",
      id,
    };
  }

  return {
    controller,
    method: method,
  };
};
