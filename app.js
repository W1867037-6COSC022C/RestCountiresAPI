import "dotenv/config";
import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import cors from "cors";

import authRoute from "./routes/authRoutes.js";
import apiKeyRoute from "./routes/apiKeyRoutes.js";
import adminApiKeyRoute from "./routes/adminAPIKeyRoutes.js";
import countryRoute from "./routes/countryRoutes.js";

const app = express();

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
