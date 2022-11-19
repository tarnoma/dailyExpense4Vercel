const authJWT = require("../middlewares/jwt.auth.middleware");
const authAdmin = require("../middlewares/admin.auth.middleware");

module.exports = (app) => {
  const category_controller = require("../controllers/category.controller");
  var router = require("express").Router();
  router.get("/", authJWT, category_controller.userGetParentCategory);
  router.get("/child/:id", authJWT, category_controller.userGetChildCategory);
  router.get(
    "/admin/parent",
    authJWT,
    authAdmin,
    category_controller.adminGetParentCategory
  );
  router.get(
    "/admin/child/:id",
    authJWT,
    authAdmin,
    category_controller.adminGetChildCategory
  );
  router.post(
    "/admin/add",
    authJWT,
    authAdmin,
    category_controller.adminAddCategory
  );
  router.delete(
    "/admin/del/:id",
    authJWT,
    authAdmin,
    category_controller.adminDeleteCategory
  );
  router.put(
    "/admin/up/:id",
    authJWT,
    authAdmin,
    category_controller.adminUpdateCategory
  );
  app.use("/category", router);
};
