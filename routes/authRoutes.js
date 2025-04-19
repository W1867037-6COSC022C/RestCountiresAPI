import { Router } from "express";
const router = Router();
import csurf from "csurf";
const csrfProtection = csurf({ cookie: true });

import {
  registerUser,
  login,
  getLoggedInUserProfile,
  getAllUsers,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/authController.js";
import { verifyJWT } from "../middleware/auth.js";

router.post("/register", registerUser);
router.post("/login", login);

router.get("/profile", verifyJWT, getLoggedInUserProfile);
router.get("/all-users", verifyJWT, getAllUsers);
router.put("/profile", verifyJWT, updateUserProfile);
router.delete("/user/:id", verifyJWT, deleteUserProfile);

router.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

export default router;
