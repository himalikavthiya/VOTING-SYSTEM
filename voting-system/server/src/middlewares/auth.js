const jwt = require("jsonwebtoken");
const { UserModel } = require("../model");
const config = require("../config/dbconnection");

// auth function create
const auth = () => async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(
        res.status(401).json({
          success: false,
          message: "Plesase Authentication....",
        })
      );
    }
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      config.jwt.secret_key
    );
    console.log(decoded);
    if (!decoded) {
      return next(new Error("Please Enter Valid Token !"));
    }
    const users = await UserModel.findOne({ cardNo: decoded.cardNo });
    if (!users) {
      return next(new Error("Please Authenticate ..."));
    }
    req.cardNo = users;
    next();
  } catch (error) {
    return next(new Error(error));
  }
};

module.exports = auth;
