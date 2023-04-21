const router = require("express").Router();

router.use("/librarySystem", require("./api"));

module.exports = router;
