require("dotenv").config();

const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const authenticate = require("../middleware/authenticate");
const cloudinary = require("../cloudinary/cloudinary");

// user registation
router.post("/", async (req, res) => {
  //console.log(req.body);
  const {fname, username, password, email, privacy} = req.body;

  if (!fname || !username || !password || !email || !privacy) {
    res.status(422).json({error: "fill all the details"});
  }
  try {
    const preuser = await userdb.find({
      $or: [{email: email}, {username: username}],
    });
    if (preuser.length > 0) {
      const existingEmail = preuser.find((user) => user.email === email);
      const existingUsername = preuser.find(
        (user) => user.username === username
      );

      if (existingEmail) {
        res.status(422).json({error: "• Email has already been taken"});
      } else if (existingUsername) {
        res.status(422).json({error: "• Username has already been taken"});
      }
    } else {
      const finalUser = new userdb({
        fname,
        username,
        password,
        email,
        privacy,
      });
      //password hasing
      const storeData = await finalUser.save();
      //console.log(storeData);
      res.status(201).json(storeData);
    }
  } catch {
    res.status(422).json("error");
    console.log("catch block error");
  }
});

//user login page

router.post("/Signin", async (req, res) => {
  //console.log(res.body);
  const {username, password} = req.body;

  if (!username || !password) {
    res.status(422).json({error: "fill all the details"});
  }

  try {
    const userValid = await userdb.findOne({username: username});

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        res.status(422).json({error: "invalid details"});
      } else {
        // token generate

        const token = await userValid.generateAuthtoken();
        //console.log(token);

        //cookiGenerate
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 8000000),
          httpOnly: true,
        });

        const result = {
          userValid,
          token,
        };
        res.status(202).json({status: 201, result});
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block");
  }
});

// user Uservalidation

router.get("/validUser", authenticate, async (req, res) => {
  //console.log(req.userId);
  //console.log(req.rootUser);

  try {
    const ValidUser = await userdb.findOne({_id: req.userID});
    res.status(201).json({status: 201, ValidUser});
  } catch (error) {
    res.status(401).json({status: 401, error});
  }
});

// avter page data

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({storage: imgconfig});

router.post("/avater", upload.single("img"), async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path);
  //console.log(upload);

  const {username, location} = req.body;
  const img = req.file;

  try {
    const AvatarData = await userdb.findOne({username});

    if (AvatarData) {
      AvatarData.img = upload.secure_url;
      AvatarData.location = location;
      await AvatarData.save();
      res.status(200).json({message: "Avatar data updated successfully"});
    } else {
      res.status(201).json({message: "Username ont found"});
    }
  } catch (error) {
    console.error("Error saving avatar data:", error);
    res.status(500).json({error: "Error saving avatar data"});
  }
});

//choice page data
router.post("/choice", async (req, res) => {
  //console.log(req.body);
  const {designer, HireDesigner, inspiration, username} = req.body;
  try {
    const Data = await userdb.findOne({username});
    if (Data) {
      Data.Designer = designer;
      Data.Hire_Designer = HireDesigner;
      Data.inspiration = inspiration;
      const storeData = await Data.save();
      res.status(201).json(storeData);
    } else {
      console.log("no user found");
    }
  } catch (error) {
    res.status(422).json("error");
    console.log("catch block error");
  }
});

//email varification data
router.post("/verify", async (req, res) => {
  //console.log(req.body);
  try {
    const {username} = req.body;

    const user = await userdb.findOne({username});

    if (!user) {
      return res.status(404).json({error: "User not found"});
    }

    const {email, _id: id} = user;

    res.status(200).json({email, id});
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

//header page
router.post("/sendId", async (req, res) => {
  //console.log(req.body);
  try {
    const {userId} = req.body;
    const user = await userdb.findOne({_id: userId});
    if (!user) {
      return res.status(404).json({error: "User not found"});
    }
    const {img} = user;
    res.status(200).json({img});
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

module.exports = router;
