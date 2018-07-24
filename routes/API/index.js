const router = require("express").Router();
const articRoutes = require("./articles");

// Book routes
router.use("/articles", articleRoutes);

module.exports = router;
