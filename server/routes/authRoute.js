const express = require("express");
const { validateSignUp, validateNewPassword } = require("../middleware/validate");
const { authenticateToken } = require("../middleware/auth");
const { signUp, login, changePassword } = require("../controllers/authController");

const router = express.Router();

router.post("/signup",validateSignUp,signUp);

router.post("/login",login);

router.post("/changePassword",authenticateToken, validateNewPassword,changePassword);

module.exports = router;