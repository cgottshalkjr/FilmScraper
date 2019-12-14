var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.port || 3000;

// Initialize Express
var app = express();
var routes = require("./routes");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//Routes




// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.use(routes);
// Connect to the Mongo DB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Filmscraper";

// mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://localhost/Filmscraper", { useNewUrlParser: true });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Filmscraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});


