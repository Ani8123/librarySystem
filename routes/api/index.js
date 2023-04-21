const router = require("express").Router();

router.use("/", require("./library.route"));

module.exports = router;
