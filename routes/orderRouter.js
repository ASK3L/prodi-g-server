const express = require("express");
const orderController = require("../controllers/orderController");
const { protect, restrictTo } = require("../controllers/authcontroller");

const router = express.Router();

router.use(protect);
router.use(restrictTo(["admin"]));

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);
router
  .route("/:id")
  .get(orderController.getOrderById)
  .put(orderController.updateOrderById)
  .delete(orderController.deleteOrderById);

module.exports = router;
