require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
