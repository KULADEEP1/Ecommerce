const express = require("express");
const User = require("../models/user.js");
const { signupUser, loginUser } = require("../controller/user-controller.js");
const middleware = require("../middleware.js");

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/myprofile", middleware, async (req, res) => {
  try {
    let exist = await User.findById(req.user.id);
    if (!exist) {
      return res.status(400).send("user not found");
    }
    return res.status(200).json(exist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "server error" });
  }
});
module.exports = router;
