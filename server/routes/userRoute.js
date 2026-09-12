const express = require("express");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");
const { allStores, updateRating, ownerDashboard } = require("../controllers/userController");
const router = express.Router();

router.use(authenticateToken);

router.get("/user/stores", authorizeRoles("USER"), allStores);
router.post("/user/rate", authorizeRoles("USER"), updateRating);

router.get("/owner/dashboard", authorizeRoles("STORE_OWNER"), ownerDashboard)


module.exports = router;

