const controller = require("../controller/invoice.controller");

const invoice = (app) => {
  app.get("/api/invoice", controller.getAll);
  app.post("/api/invoice/getOne", controller.getOne);
  app.post("/api/invoice", controller.create);
  app.put("/api/invoice", controller.update);
  app.delete("/api/invoice", controller.remove);
};

module.exports = invoice;
