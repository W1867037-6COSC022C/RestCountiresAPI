import "dotenv/config";
import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import cors from "cors";

import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerDocument = YAML.load(join(__dirname, "openapi.yaml"));

import authRoute from "./routes/authRoutes.js";
import apiKeyRoute from "./routes/apiKeyRoutes.js";
import adminApiKeyRoute from "./routes/adminAPIKeyRoutes.js";
import countryRoute from "./routes/countryRoutes.js";

const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

app.use(json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/api-keys", apiKeyRoute);
app.use("/admin/api-keys", adminApiKeyRoute);
app.use("/countries", countryRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
