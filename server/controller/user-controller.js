const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    let exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "User already Exist" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords are not matching" });
    }
    const user = {
      username,
      email,
      password,
      confirmPassword,
    };
    const newUser = new User(user);
    await newUser.save();

    return res.status(201).json({ msg: "signup Successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error while signup user " });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let exist = await User.findOne({ email });
    if (!exist) {
      return res.status(400).json({ msg: "user does not exist" });
    }
    if (exist.password !== password) {
      return res.status(400).json({ msg: "INVALID CREDENTIALS" });
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecretkey", { expiresIn: "15m" }, (err, token) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "Error while login in user" });
      }
      return res.status(201).json({ token });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error while login in user" });
  }
};

module.exports = { signupUser, loginUser };
