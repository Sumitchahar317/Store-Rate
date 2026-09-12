const express = require("express");
const { getDashboardStats, createUser, createStore, getStores, getUsers } = require("../controllers/adminController");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");
const { validateSignUp } = require("../middleware/validate");
const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRoles("ADMIN"));

router.get("/dashboard", getDashboardStats);
router.post("/users", validateSignUp, createUser);
router.post("/store", createStore);

router.get("/users",getUsers);
router.get("/stores",getStores);

module.exports = router;
