const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = "gedgetraweadfgdfgdgdgdfgdf#$%E^%wer";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  privacy: {
    type: Boolean,
    required: true,
    default: false,
  },
  img: {
    type: String,
  },
  location: {
    type: String,
  },
  Designer: {
    type: Boolean,
    default: false,
  },
  Hire_Designer: {
    type: Boolean,
    default: false,
  },
  inspiration: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//password hash

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 15);
  }
  next();
});

// token generate
userSchema.methods.generateAuthtoken = async function () {
  try {
    let newToken = jwt.sign({_id: this._id}, secretKey, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({token: newToken});
    await this.save();
    return newToken;
  } catch (error) {
    resizeBy.status(422).json("error");
  }
};

// model
const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
