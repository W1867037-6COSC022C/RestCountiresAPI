import "dotenv/config";
import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoutes.js";

const app = express();

app.use(json());
app.use(cookieParser());

app.use("/auth", authRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
