const express = require("express");
const User = require("../models/user.js");
const { signupUser, loginUser } = require("../controller/user-controller.js");
const validateToken = require("../middleware.js");

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/validate-token", validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json({ isValid: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", isValid: false });
  }
});

module.exports = router;
