const controller = require("../controller/delivery.controller");

const delivery = (app) => {
  app.get("/api/delivery", controller.getAll);
  app.post("/api/delivery/getone", controller.getOne);
  app.post("/api/delivery", controller.create);
  app.put("/api/delivery", controller.update);
  app.delete("/api/delivery", controller.remove);
};

module.exports = delivery;
