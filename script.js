console.log("Unicorns are here!");

(function() {
    var searchArea = $("input");
    var results = $("#results");

    searchArea.on("input", function() {
        var value = searchArea.val();
        var html = "";
        if (!value) {
            return results.empty;
        }

        $.ajax({
            url: "https://flame-egg.glitch.me/",
            data: {
                q: value
            },
            success: function(matches) {
                if (value === searchArea.val()) {
                    if (matches.length === 0) {
                        html = '<div class="empty">No Results</div>';
                        results.html(html);
                    }

                    for (var x = 0; x < matches.length; x++) {
                        html += '<div class="result">' + matches[x] + "</div>";
                    }
                    results.html(html);
                }
            }
        });

        results.on("mouseover", ".result", function(event) {
            $(".result").removeClass("highlight");
            $(event.target).addClass("highlight");
        });

        $(document).on("mousedown", ".result", function(event) {
            searchArea.val($(event.target).text());
            results.empty();
        });

        searchArea.blur(function() {
            results.empty();
        });

        searchArea.on("keydown", function(event) {
            var results = $(".result");
            var highlighted = $(".highlight");
            if (event.which == 13) {
                searchArea.val(highlighted.text());
                results.empty();
            } else if (event.which == 40) {
                if (results.index(highlighted) < results.length - 1) {
                    if (highlighted.length < 1) {
                        results.eq(0).addClass("highlight");
                    } else {
                        highlighted
                            .removeClass("highlight")
                            .next()
                            .addClass("highlight");
                    }
                }
            } else if (event.which == 38) {
                if (highlighted.length < 1) {
                    results.eq(0).addClass("highlight");
                } else if (results.index(highlighted) > 0) {
                    highlighted
                        .removeClass("highlight")
                        .prev()
                        .addClass("highlight");
                }
            }
        });

        results.on("focus", function() {
            searchArea.trigger("input");
        });
    });
})();
