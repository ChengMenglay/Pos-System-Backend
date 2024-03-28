const controller = require("../controller/payment_method.controller");
const upload = require("../util/image");
const payment_method = (app) => {
  app.get("/api/payment_method", controller.getAll);
  app.post("/api/payment_method/getOne", controller.getOne);
  app.post(
    "/api/payment_method",
    upload.single("payment_method_image"),
    controller.create
  );
  app.put(
    "/api/payment_method",
    upload.single("payment_method_image"),
    controller.update
  );
  app.delete("/api/payment_method", controller.remove);
};

module.exports = payment_method;
