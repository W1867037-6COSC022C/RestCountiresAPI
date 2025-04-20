import { Router } from "express";
const router = Router();
import { authenticateApiKey } from "../middleware/APIKey.js";
import {
  getAllCountries,
  getCountryByName,
} from "../controllers/restCountryController.js";

router.get("/", authenticateApiKey, getAllCountries);

router.get("/:name", authenticateApiKey, getCountryByName);

export default router;
