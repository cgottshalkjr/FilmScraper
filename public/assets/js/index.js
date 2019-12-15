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


})


