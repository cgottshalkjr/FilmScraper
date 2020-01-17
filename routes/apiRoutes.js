var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


//Scraping articles from *thefilmstage* and saving into DB.
//Three different each loops. (one for carousel and two for another section of news that each have different class names)
//Technically only pulling from two sources from the same site.
router.get("/api/scrape", function (req, res) {

    // console.log(req)

    axios.get("https://thefilmstage.com/").then(function (response) {

    console.log(response)

        var $ = cheerio.load(response.data);

        $(".cb-grid-feature").each(function (i, element) {

            console.log("1", element);

            var result = {};

            result.title = $(element).children().text().trim();
            result.link = $(element).children("a").attr("href");
            result.image = $(element).find("a").find("img").attr("src");
            result.type = "slideshow";
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

        $(".cb-grid-x").eq(0).find(".cb-grid-feature").each(function (i, element) {

            console.log("2", element)

            console.log("Second scrape");
            var result = {};

            result.title = $(element).find(".cb-article-meta").text().trim();
            result.link = $(element).attr("href");
            result.image = $(element).find("img").attr("src");
            result.type = "news";
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
//End of scrape for articles-------------------------------

//Route for saving articles to DB
router.put("/saved/article/:id", function (req, res) {

    var articleId = req.params.id;

    db.Article.findOneAndUpdate(
        { _id: articleId },
        {
            $set: {
                saved: true
            }
        }
    )
        .then(function (dbSave) {
            res.json(dbSave)
        })
        .catch(function (err) {
            res.json(err);
        })
});

//Route for deleting saved articles from DB
router.delete("/saved/article/:id", function (req, res) {

    var articleId = req.params.id;

    db.Article.deleteOne(
        { _id: articleId },
    )
        .then(function (dbDeleteOne) {
            res.json(dbDeleteOne);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//Route for deleting everything stored in DB.
router.delete("/api/scrape", function (req, res) {

    db.Article.deleteMany({})
        .then(function (dbDeleteAll) {
            res.json(dbDeleteAll);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//Route for creating a new comment from user on an article.
router.post("/saved/article/:id", function (req, res) {

    db.Comment.create(req.body)

        .then(function (dbNewComment) {

            return db.Article.findOneAndUpdate({ _id: req.params.id },
                { $push: { comment: dbNewComment._id } },
                { new: true });
        })
        .then(function (dbNewComment) {
            res.json(dbNewComment);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//Route for deleting user comment from the DB.
router.delete("/saved/article/:articleId/comment/:id", function (req, res) {

    db.Comment.deleteOne({ _id: req.params.id })
        .then(function () {
            return db.Article.findOneAndUpdate(
                { _id: req.params.articleId },
                {
                    $pull:
                        { comment: req.params.id }
                }
            );
        })
        .then(function (dbDeleteOne) {
            res.json(dbDeleteOne);
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = router;