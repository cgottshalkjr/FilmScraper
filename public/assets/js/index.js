$("#scrapeBtn").on("click", function (event) {

    console.log("scraped !");

    event.preventDefault();

    $.ajax("/api/scrape", { type: "GET" }
    )
        .then(function () {
            location.reload();
        });
});

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

$(document).on("click", "#clearBtn", function (event) {

    console.log("The DB has been cleared!!");

    event.preventDefault();

    $.ajax("/api/scrape", { type: "DELETE" }
    )
        .then(function () {
            location.reload();
        });
});

$(document).on("click", ".commentBtn", function (event) {

    console.log("modal clicked!!");

    event.preventDefault();

    var articleId = $(this).data("id");

    $(".titleField" + articleId).val("");
    $(".commentTextBody" + articleId).val("");
    $("#commentModal-" + articleId).modal("show");

    return articleId
});

$(document).on("click", "#saveComment", function (event) {

    console.log("saved a comment!!!");

    event.preventDefault();

    var commentId = $(this).data("id");

    // console.log(commentId);
    // console.log(this);

    var title = $(".titleField-" + commentId).val();
    var text = $(".commentTextBody-" + commentId).val();

    // console.log("===========");
    // console.log(title);
    // console.log(text);
    // console.log("===========");

    $.ajax({
        type: "POST",
        url: "/saved/article/" + commentId,
        data: {
            title: title,
            text: text
            // created: Date.now()
        }
    })
    .then(function () {
            $("#commentModal-" + commentId).modal("hide");
        });
});


