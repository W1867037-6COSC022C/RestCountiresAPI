import { Router } from "express";
const router = Router();

import {
  registerUser,
  login,
  getLoggedInUserProfile,
  getAllUsers,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/authController.js";

import { verifyJWT } from "../middleware/auth.js";
//const { verifyJWT } = verifyJWT;

router.post("/register", registerUser);
router.post("/login", login);

router.get("/profile", verifyJWT, getLoggedInUserProfile);
router.get("/all-users", verifyJWT, getAllUsers);
router.put("/profile", verifyJWT, updateUserProfile);
router.delete("/user/:id", verifyJWT, deleteUserProfile);

export default router;
