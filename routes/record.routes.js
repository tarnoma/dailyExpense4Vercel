const authJWT = require("../middlewares/jwt.auth.middleware");
const authOwner = require("../middlewares/record.auth.middleware");
module.exports = (app) => {
  const record_controller = require("../controllers/record.controller");
  var router = require("express").Router();
  router.post("/", authJWT, record_controller.addNewRecord);
  router.get("/", authJWT, record_controller.userGetRecords);
  router.get("/andcat", authJWT, record_controller.userGetRecordsAndCat);
  router.delete(
    "/del/:id",
    authJWT,
    authOwner,
    record_controller.userDeleteRecord
  );
  app.use("/record", router);
};
