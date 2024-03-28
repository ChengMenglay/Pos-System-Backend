const controller = require("../controller/product.controller");
const upload = require("../util/image");
const product = (app) => {
  app.get("/api/product", controller.getAll);
  app.post("/api/product/getOne", controller.getOne);
  app.post("/api/product", upload.single("product_image"), controller.create);
  app.put("/api/product", upload.single("product_image"), controller.update);
  app.put("/api/product/reStock", controller.reStock);
  app.delete("/api/product", controller.remove);
};

module.exports = product;
