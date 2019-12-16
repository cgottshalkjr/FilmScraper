//Click for scraping the newest articles
$("#scrapeBtn").on("click", function (event) {

    console.log("scraped !");

    event.preventDefault();

    $.ajax("/api/scrape", { type: "GET" }
    )
        .then(function () {
            location.reload();
        });
});

//Click for saving articles to DB
$(document).on("click", "#savedBtn", function (event) {

    console.log("article has been saved");

    event.preventDefault();

    var articleId = $(this).data("id");
    $.ajax({
        url: "/saved/article/" + articleId,
        type: "PUT",
        data: { saved: true }
    })
        .then(function () {
            location.reload();
        });
});

//Click for deleting saved articles from DB
$(document).on("click", ".deleteBtn", function (event) {

    console.log("deleted!!!");

    event.preventDefault();

    var articleId = $(this).data("id");
    $.ajax({
        url: "/saved/article/" + articleId,
        type: "DELETE",
        data: { saved: true }
    })
        .then(function () {
            location.reload();
        });
});

//Click for clearing entire DB of articles
$(document).on("click", "#clearBtn", function (event) {

    console.log("The DB has been cleared!!");

    event.preventDefault();

    $.ajax("/api/scrape", { type: "DELETE" }
    )
        .then(function () {
            location.reload();
        });
});

//Click for toggling the modal to bring up a field for user to write comment.
$(document).on("click", ".commentBtn", function (event) {

    console.log("modal clicked!!");

    event.preventDefault();

    var articleId = $(this).data("id");

    $(".titleField" + articleId).val("");
    $(".commentTextBody" + articleId).val("");
    $("#commentModal-" + articleId).modal("show");

    return articleId
});

//Click for saving comment to DB and rendering on modal.
$(document).on("click", "#saveComment", function (event) {

    console.log("saved a comment!!!");

    event.preventDefault();

    var commentId = $(this).data("id");

    var title = $(".titleField-" + commentId).val();
    var text = $(".commentTextBody-" + commentId).val();

    $.ajax({
        type: "POST",
        url: "/saved/article/" + commentId,
        data: {
            title: title,
            text: text
        }
    })
        .then(function () {
            location.reload();
        });
});

//Click for deleting a comment from a user.
$(document).on("click", ".removeCmt", function (event) {

    console.log("this delete button is working!");

    event.preventDefault();

    var id = $(this).data("id");

    var commentId = $(".commentField").data("id");

    $.ajax({
        url: "/saved/article/" + commentId + "/comment/" + id,
        type: "DELETE"
    })
        .then(function () {
            location.reload();
        });
});

