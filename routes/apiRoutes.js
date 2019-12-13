var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


//Scraping articles from *thefilmstage* and saving into DB.
router.get("/scrape", function (req, res) {

    axios.get("https://thefilmstage.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        $(".spotlight .slideshow_slide").each(function (i, element) {

            var result = {};

            result.title = $(element).children().text().trim();
            result.link = $(element).children("a").attr("href");
            result.image = $(element).find("a").find("img").attr("src");
            console.log(result);
            if (result.title && result.link && result.link) {

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

        $(".column_box .a").each(function (i, element) {

            var result = {};

            result.title = $(element).children().text().trim();
            result.link = $(element).children("a").attr("href");
            result.image = $(element).find("a").find("img").attr("src");
            console.log(result);
            if (result.title && result.link && result.link) {

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