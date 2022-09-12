const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an order name"],
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
  },
  status: {
    type: String,
    required: [true, "Please enter quantity"],
  },
  order_num: {
    type: Number,
    required: [true, "Please enter order number"],
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: [true, "Please enter a valid owner id"],
  },
});

module.exports = mongoose.model("Order", OrderSchema);
