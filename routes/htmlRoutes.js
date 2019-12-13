var express = require("express");
var router = express.Router();
var db = require("../models");

//Route to get all the articles within the DB.
router.get("/", function (req, res) {

    db.Article.find({
        "saved": false
    })
        .limit(40)
        .then(function (data) {
            var hbsObject = {
                articles: data
            };
            res.render("index", hbsObject);
        })
        .catch(function (error) {
            res.send(error)
        });
});

//Route to get all saved Articles.
router.get("/saved", function (req, res) {

    db.Article.find({
        "saved": true
    })
        .populate("comment")
        .then(function (dbData) {
            var hbsObject = {
                articles: dbData
            };
            res.render("saved", hbsObject);
        })
        .catch(function (error) {

            res.json(error);
        });
});





module.exports = router;