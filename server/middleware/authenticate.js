const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const secretKey = "gedgetraweadfgdfgdgdgdfgdf#$%E^%wer";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorozition;
    //console.log(token);

    const Verification = jwt.verify(token, secretKey);
    //console.log(Verification);

    const rootUser = await userdb.findOne({_id: Verification._id});
    //console.log(rootUser);
    if (!rootUser) {
      throw new Error("User Not  found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (error) {
    res
      .status(401)
      .json({status: 401, message: "Unauthorized and no token provide"});
  }
};

module.exports = authenticate;
