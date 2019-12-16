var router = require("express").Router();
var apiRoutes = require("./apiRoutes");
var htmlRoutes = require("./htmlRoutes");

//Making it easier to require both routes and exporting them to server.
router.use("/", apiRoutes);
router.use("/", htmlRoutes);

module.exports = router;