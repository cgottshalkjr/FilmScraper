$("#scrapeBtn").on("click", function () {
    $.ajax("/api/scrape", {type: "GET"}
    ).then(function ()  {
        location.reload();
    })
})

$("#clearBtn").on("click", function () {
    $.ajax("/api/clear", {type: "DELETE"}
    ).then(function ()  {
        location.reload();
    })
})

$("#savedBtn").on("click", function () {
    $.ajax("/api/article/" + link, {type: "DELETE"}
    ).then(function ()  {
        location.reload();
    })
})

