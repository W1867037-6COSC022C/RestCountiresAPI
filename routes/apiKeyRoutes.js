import { Router } from "express";
const router = Router();

import authMiddleware from "../middleware/auth.js";

const { verifyJWT } = authMiddleware;
import {
  generateApiKeyForUser,
  deleteMyApiKey,
  getMyApiKeys,
  updateMyApiKey,
} from "../controllers/apiKeyHandler.js";

// All routes below require authentication.
router.post("/", verifyJWT, generateApiKeyForUser);
router.get("/", verifyJWT, getMyApiKeys);
router.put("/:id", verifyJWT, updateMyApiKey);
router.delete("/:id", verifyJWT, deleteMyApiKey);

export default router;
