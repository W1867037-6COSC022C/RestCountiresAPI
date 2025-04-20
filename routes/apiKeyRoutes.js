import { Router } from "express";
const router = Router();

import { verifyJWT } from "../middleware/auth.js";

// import {
//   generateApiKeyForUser,
//   deleteMyApiKey,
//   getMyApiKeys,
//   updateMyApiKey,
// } from "../controllers/apiKeyHandler.js";
import apiKeyController from "../controllers/apiKeyController.js";
// All routes below require authentication.
router.post("/", verifyJWT, apiKeyController.generateApiKey);
router.get("/", verifyJWT, apiKeyController.getMyApiKeys);
router.put("/:id", verifyJWT, apiKeyController.updateMyApiKey);
router.delete("/:id", verifyJWT, apiKeyController.deleteMyApiKey);

export default router;
