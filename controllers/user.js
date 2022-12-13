const { UserModel } = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
  require("dotenv").config();  // {key:value} => env file

// ==================== login ==========================//
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isPresent = await UserModel.findOne({ email });

    if (isPresent) {
      // compare the password against already existing
      const hashedPassword = isPresent.password;
      const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);
      if (isPasswordCorrect) {
        var token =  jwt.sign({ userId:isPresent._id }, process.env.JWT_SECRET_KEY,{expiresIn:'1h'});

        return res.status(200).json({ message: "Login successful",error:false,token });
      } else {
        return res.status(404).json({ message: "Wrong credentials" });
      }
    } else {
      return res.status(404).json({ message: "Please signup" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

// ====================== sign up =======================//
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  // middleware for checking email is valid;
  // check if the user is already present
  const isPresent = await UserModel.findOne({ email });
  if (isPresent) {
    return res.status(200).json({ message: "User already exist", error: true }); // axiso => res =>
  } else {
    // 1. we need to hash our password =>
    try {
      const hashedPassword = bcrypt.hashSync(password, 8);
      const new_user = new UserModel({ name, email, password: hashedPassword });
      await new_user.save();
      res.send("Signup successful");
    } catch (error) {
      return res.status(404).json({ message: "Something went wrong.", error: true });
    }
  }
};

module.exports = { login, signup };
