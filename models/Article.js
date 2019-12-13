var mongoose = require("mongoose");

var Schema = mongoose.Schema;

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
            ref: "Note"
        }
    ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;