const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter a email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ["admin", "user"],
      message: "Can either be a user or an admin",
    },
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.method("isCorrectPassword", async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
});
module.exports = mongoose.model("User", UserSchema);
