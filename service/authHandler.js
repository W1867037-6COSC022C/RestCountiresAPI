// services/authService.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userDao = require("../dao/restCountriesUserDao");

const accessDeniedMsg = "Access Denied! Please Contact Help Desk.";

const JWT_SECRET_KEY = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

function issueJWTTocken(payload) {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
}

//User Registration Handling
async function register({ username, email, password }) {
  const existingUser = await userDao.findUserByEmail(email);
  if (existingUser) {
    throw new Error("A Registered User. Please login");
  }

  const hashedPassword = await bcrypt.hash(password, 10); //password hashing

  const userCount = await userDao.getUserCount();
  const roleId = userCount === 0 ? 1 : 2;

  const newUser = { username, email, password: hashedPassword, roleId };
  const registeredUser = await userDao.createUser(newUser);

  const token = issueJWTTocken({
    id: registeredUser.userIdd,
    email: registeredUser.email,
    roleId: registeredUser.roleId,
  });

  return { token, user: registeredUser };
}

//Login function
async function login({ email, password }) {
  const loginUser = await userDao.findUserByEmail(email);

  if (!loginUser) {
    throw new Error("Couldn't find a Registered User, Please try again");
  }

  const isPasswordValid = await bcrypt.compare(password, loginUser.password);
  if (!isPasswordValid) {
    throw new Error("Password Invalid, Please try again");
  }

  const token = issueJWTTocken({
    id: loginUser.userId,
    email: loginUser.email,
    role: loginUser.roleId,
  });

  return {
    token,
    user: {
      id: loginUser.userId,
      username: loginUser.username,
      email: loginUser.email,
      role: loginUser.roleId,
    },
  };
}

async function getLoggedInUserProfile(userId) {
  const user = await userDao.findUserById(userId);
  if (!user) {
    throw new Error("User Not Found");
  }
  return user;
}

async function getAllUsers(currentUserRole) {
  if (currentUserRole !== 1) {
    throw new Error(accessDeniedMsg);
  }
  return await userDao.findAllUsers();
}

async function updateUserProfile(userId, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return await userDao.updateUser(userId, data);
}

async function deleteUser(currentUserRole, userId) {
  if (currentUserRole !== 1) {
    throw new Error(accessDeniedMsg);
  }
  return await userDao.deleteUser(userId);
}

module.exports = {
  register,
  login,
  getLoggedInUserProfile,
  getAllUsers,
  updateUserProfile,
  deleteUser,
};
