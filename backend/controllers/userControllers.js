const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      // res.status(401).json('Invalid credentials')
      res.status(400);
      throw new Error("Please enter all the fields");
    }

    const userExits = await User.findOne({ email });

    if (userExits) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user");
    }
  } catch (error) {
    console.log("error:: userControllers ::", error);
    throw error;
  }
};

module.exports = { registerUser };
