const controller = require("../controller/user.controller");
const user = (app) => {
  app.get("/api/user", controller.getAll);
  app.post("/api/user/signup", controller.Signup);
  app.post("/api/user/login", controller.Login);
  app.delete("/api/user", controller.remove);
};

module.exports = user;
