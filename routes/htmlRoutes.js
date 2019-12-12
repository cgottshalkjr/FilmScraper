const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

//Route to get all the articles within the DB.
router.get("/", function (req, res) {

    db.Article.find({
        "saved": false
    })
        .limit(20)
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

//Scraping articles from *thefilmstage* and saving into DB.
router.get("/scrape", function (req, res) {

    axios.get("https://thefilmstage.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        $(".slideshow_slide").each(function (i, element) {

            var result = {};

            result.title = $(element).children("a").text().trim();
            result.link = $(element).children("a").attr("href");
            result.imgLink = $(element).find("a").find("img").attr("src");

            if (result.title && result.link && result.imgLink) {

                db.Article.create(result,
                    function (err, inserted) {
                        if (err) {

                            console.log(err);
                        }
                        else {

                            console.log(inserted);
                        }
                    });
            }
        });
        res.send("Scrape was successful!");
    });
});



module.exports = router;