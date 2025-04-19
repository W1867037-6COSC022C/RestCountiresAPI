import {
  register,
  login as _login,
  getLoggedInUserProfile as _getLoggedInUserProfile,
  getAllUsers as _getAllUsers,
  updateUserProfile as _updateUserProfile,
  deleteUserProfile as _deleteUserProfile,
} from "../service/authHandler.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await register({ username, email, password });
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
    const result = await _login({ email, password });
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
    const user = await _getLoggedInUserProfile(req.user.id);
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
    const users = await _getAllUsers(req.user.role);
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
  try {
    const updatedUser = await _updateUserProfile(req.user.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during updating user profile",
      error: err.message,
    });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    await _deleteUserProfile(req.user.role, req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during deleting user profile",
      error: err.message,
    });
  }
};

export {
  registerUser,
  login,
  getLoggedInUserProfile,
  getAllUsers,
  updateUserProfile,
  deleteUserProfile,
};
