const User = require("../models/User");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.login = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log(req.body);

  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) throw new AppError("User not found");

  if (!(await user.isCorrectPassword(data.password)))
    throw new AppError("Password is invalid", 400);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      token: token,
      user: user,
    },
  });
});

exports.register = catchAsync(async (req, res, next) => {
  const data = req.body;

  const newUser = await User.create(data);
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });

  res.status(201).json({
    status: "success",
    data: {
      token: token,
      user: newUser,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.get("Authorization");
  if (!token || !token.startsWith("Bearer"))
    throw new AppError("Token is missing or invalid", 400);
  let encryptedString = token.split(" ")[1];
  const decoded = jwt.verify(encryptedString, process.env.JWT_SECRET);

  if (!decoded) throw new AppError("Token is missing or invalid", 400);

  const user = await User.findById(decoded.id);
  user.password = undefined;
  req.user = user;
  next();
});

exports.restrictTo = (allowedRoles) =>
  catchAsync(async (req, res, next) => {
    if (allowedRoles.includes(req.user.role)) return next();
    else throw new AppError("You do not have access to this url", 400);
  });
