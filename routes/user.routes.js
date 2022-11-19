const authJWT = require("../middlewares/jwt.auth.middleware");
const authAdmin = require("../middlewares/admin.auth.middleware");
module.exports = (app) => {
  const user_controller = require("../controllers/user.controller");
  var router = require("express").Router();
  router.post("/signup", user_controller.registerNewUser);
  router.get("/check/:user", user_controller.checkUsername);
  router.post("/login", user_controller.loginUser);
  router.get("/admin/", authJWT, authAdmin, user_controller.getAllUsers);
  router.put("/admin/:id", authJWT, authAdmin, user_controller.toggleActive);
  app.use("/user", router);
};
