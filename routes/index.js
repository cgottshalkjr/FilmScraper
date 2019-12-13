var router = require("express").Router();
var apiRoutes = require("./apiRoutes");
var htmlRoutes = require("./htmlRoutes");


router.use("/", apiRoutes);
router.use("/", htmlRoutes);


module.exports = router;