import { Router } from "express";
const router = Router();
import apiKeyController from "../controllers/apiKeyController.js";
import { verifyJWT } from "../middleware/auth.js";

// All routes below require authentication.
router.get("/", verifyJWT, apiKeyController.adminGetAllApiKeys);
router.put("/:id", verifyJWT, apiKeyController.adminUpdateApiKey);
router.delete("/:id", verifyJWT, apiKeyController.adminDeleteApiKey);

export default router;
