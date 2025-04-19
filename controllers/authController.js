// controllers/authController.js
const authHandler = require("../service/authHandler");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await authHandler.register({ username, email, password });
    res.status(201).json({
      message: "User created Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during registration",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authHandler.login({ email, password });
    res.status(200).json({
      message: "user logged-in",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during login",
      error: err.message,
    });
  }
};

const getLoggedInUserProfile = async (req, res) => {
  try {
    const user = await authHandler.getLoggedInUserProfile(req.user.id);
    res.status(200).json({
      message: "user profile recieved",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during recieving user profile",
      error: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await authHandler.getAllUsers(req.user.role);
    res.status(200).json({
      message: "recieved all users",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during recieving user profiles",
      error: err.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  const updatedUser = await authHandler.updateUserProfile(
    req.user.id,
    req.body
  );
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  await authHandler.deleteUser(req.user.role, req.params.id);
  res.json({ message: "User deleted successfully" });
};

module.exports = {
  registerUser,
  login,
  getLoggedInUserProfile,
  getAllUsers,
  updateUserProfile,
  deleteUser,
};
