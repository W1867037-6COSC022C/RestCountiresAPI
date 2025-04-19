import { Router } from "express";
const router = Router();
import apiKeyController from "../controllers/apiKeyController";
import authMiddleware from "../middleware/auth.js";
const { verifyJWT } = authMiddleware;

// All routes below require authentication.
router.get("/", verifyJWT, apiKeyController.adminGetAllApiKeys);
router.put("/:id", verifyJWT, apiKeyController.adminUpdateApiKey);
router.delete("/:id", verifyJWT, apiKeyController.adminDeleteApiKey);

module.exports = router;
