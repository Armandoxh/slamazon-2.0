const db = require("../../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.TOKEN_SECRET;
const index = async (req, res) => {
  try {
    const foundUsers = await db.User.find({});
    res.status(200).json({
      status: 200,
      users: foundUsers,
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        status: 500,
        message: "Unable to find list of users.",
        requestedAt: new Date().toLocaleString(),
      });
  }
};

const createUser = async (req, res) => {
  console.log("Line 72 Req.body:", req.body);
  try {
    const foundUser = await db.User.findOne(req.body);
    if (foundUser) throw "User Already Exists";
    const user = await db.User.create(req.body);

    res.status(201).json({
      status: 201,
      user,
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
    if (error === "User Already Exists") {
      return res.status(400).json({
        status: 400,
        message: "User Already Exists,",
        requestedAt: new Date().toLocaleString(),
      });
    }
    res.status(500).json({
      status: 500,
      message: error,
      requestedAt: new Date().toLocaleString(),
    });
  }
};

const loginValidation = async (req, res) => {
  let match;

  const user = await db.User.findOne({ username: req.body.username });
  console.log(req.body);
  try {
    if (!user) throw "User Not Found";

    if (req.body.username === "" || req.body.password === "") {
      throw "Empty Login Credentials";
    }

    match = await bcrypt.compare(req.body.password, user.password);

    const accessToken = jwt.sign({ user }, process.env.TOKEN_SECRET, {
      expiresIn: "12h",
    });

    if (match) {
      res.status(200).json({
        status: 200,
        accessToken,
        message: "Successfully Logged in",
      });
    } else {
      res.json({ message: "Login Unsuccessful." });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};

const showUserDetails = async (req, res) => {
  try {
    const user = await db.User.findById(req.params.id);

    return res.status(200).json({
      status: 200,
      user,
      requestedAt: new Date().toLocaleString(),
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Sorry something went wrong. Internal server Error",
      requestAt: new Date().toLocaleString(),
    });
  }
};

const profile = async (req, res) => {
  try {
    const user = await db.User.findById(req.user);

    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "something went wrong",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const toBeUpdated = await db.User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: 200,
      toBeUpdated,
      requestedAt: new Date().toLocaleString(),
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err,
      requestAt: new Date().toLocaleString(),
    });
  }
};

const usersController = {
  index,
  createUser,
  showUserDetails,
  updateUser,
  loginValidation,
  profile,
};
module.exports = usersController;
