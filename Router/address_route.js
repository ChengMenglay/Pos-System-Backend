const controller = require("../controller/address.controller");

const address = (app) => {
  app.get("/api/address", controller.getAll);
  app.get("/api/address/getId", controller.getId);
  app.post("/api/address", controller.create);
  app.put("/api/address", controller.update);
  app.delete("/api/address", controller.remove);
};
module.exports = address;
