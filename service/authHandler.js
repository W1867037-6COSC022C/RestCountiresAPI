import { hash, compare } from "bcryptjs";
import pkgSign from "jsonwebtoken";
const { sign } = pkgSign;
import restCountriesUserDao from "../dao/restCountriesUserDao.js";

const {
  findUserByEmail,
  getUserCount,
  createUser,
  findUserByUserId,
  findAllUsers,
  updateUser,
  deleteUser,
} = restCountriesUserDao;

const accessDeniedMsg = "Access Denied! Please Contact Help Desk.";

const JWT_SECRET_KEY = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

function issueJWTToken(payload) {
  return sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
}

//User Registration Handling
async function register({ username, email, password }) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("A Registered User. Please login");
  }

  const hashedPassword = await hash(password, 10); //password hashing

  const userCount = await getUserCount();
  const roleId = userCount === 0 ? 1 : 2;

  const newUser = { username, email, password: hashedPassword, roleId };
  const registeredUser = await createUser(newUser);

  const token = issueJWTToken({
    id: registeredUser.userId,
    email: registeredUser.email,
    roleId: registeredUser.roleId,
  });

  return { token, user: registeredUser };
}

//Login function
async function login({ email, password }) {
  const loginUser = await findUserByEmail(email);

  if (!loginUser) {
    throw new Error("Couldn't find a Registered User, Please try again");
  }

  const isPasswordValid = await compare(password, loginUser.password);
  if (!isPasswordValid) {
    throw new Error("Password Invalid, Please try again");
  }

  const token = issueJWTToken({
    id: loginUser.userId,
    email: loginUser.email,
    role: loginUser.roleId,
  });

  return {
    token,
    user: {
      id: loginUser.userId,
      username: loginUser.userName,
      email: loginUser.email,
      role: loginUser.roleId,
    },
  };
}

async function getLoggedInUserProfile(userId) {
  const user = await findUserByUserId(userId);
  if (!user) {
    throw new Error("User Not Found");
  }
  return user;
}

async function getAllUsers(currentUserRole) {
  if (currentUserRole !== 1) {
    throw new Error(accessDeniedMsg);
  }
  return await findAllUsers();
}

async function updateUserProfile(userId, data) {
  if (data.password) {
    data.password = await hash(data.password, 10);
  }
  return await updateUser(userId, data);
}

async function deleteUserProfile(currentUserRole, userId) {
  if (currentUserRole !== 1) {
    throw new Error(accessDeniedMsg);
  }
  return await deleteUser(userId);
}

export {
  register,
  login,
  getLoggedInUserProfile,
  getAllUsers,
  updateUserProfile,
  deleteUserProfile,
};
