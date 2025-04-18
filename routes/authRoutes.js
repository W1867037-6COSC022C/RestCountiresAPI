const express = require("express");
const router = express.Router();
const csurf = require("csurf");
const csrfProtection = csurf({ cookie: true });

const authController = require("../controllers/authController");
const { verifyJWT } = require("../middleware/auth");

router.post("/register", authController.registerUser);
router.post("/login", authController.login);

router.get("/profile", verifyJWT, authController.getLoggedInUserProfile);
router.get("/all-users", verifyJWT, authController.getAllUsers);
router.put("/profile", verifyJWT, authController.updateUserProfile);
router.delete("/user/:id", verifyJWT, authController.deleteUser);

router.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;
