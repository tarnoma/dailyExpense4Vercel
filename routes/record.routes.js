const authJWT = require("../middlewares/jwt.auth.middleware");

module.exports = (app) => {
  const record_controller = require("../controllers/record.controller");
  var router = require("express").Router();
  router.post("/", authJWT, record_controller.addNewRecord);
  router.get("/", authJWT, record_controller.userGetRecords);
  app.use("/record", router);
};
