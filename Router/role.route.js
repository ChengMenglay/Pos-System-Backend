const controller = require("../controller/rote.contorller");
const role = (app) => {
  app.get("/api/role", controller.getAll);
  app.post("/api/role", controller.create);
  app.put("/api/role", controller.update);
  app.delete("/api/role", controller.remove);
};

module.exports = role;
