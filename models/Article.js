var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//Model for new articles that are getting scraped. I had some other fields I wanted to implement but I realized the site did not offere summary or by-line by the time I was half way through. 
var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        required: true
    },

    saved: {
        type: Boolean,
        default: false,
        required: true
    },

    writer: {
        type: String,
        // required: true
    },
    
    type: {
        type: String
    },

    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;