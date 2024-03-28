const controller = require("../controller/order_detail.controller");
const orderDetail = (app) => {
  app.post("/api/orderDetail", controller.getByAddressId);
  app.post("/api/orderDetail/create", controller.create);
  app.put("/api/orderDetail", controller.updateQty);
  app.delete("/api/orderDetail", controller.remove);
  app.delete("/api/orderDetail/removeOne", controller.removeOne);
};
module.exports = orderDetail;
