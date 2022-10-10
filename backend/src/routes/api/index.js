const router = require("express").Router();

router.use("/products", require("./products"));
router.use("/auth", require("./auth"));
router.use("/cart", require("./cart"));

module.exports = router;
