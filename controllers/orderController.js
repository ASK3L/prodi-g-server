const Order = require("../models/Order");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({ owner: req.user._id });

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.getOrderById = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) throw new AppError("No order found");

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.createOrder = catchAsync(async (req, res) => {
  const data = req.body;
  data.owner = req.user._id;

  const order = await Order.create(data);

  if (!order) throw new AppError("No order found");

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.updateOrderById = catchAsync(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!order) throw new AppError("No order found");

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.deleteOrderById = catchAsync(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) throw new AppError("No order found");

  res.status(204).json({
    status: "success",
    data: {
      order: null,
    },
  });
});
