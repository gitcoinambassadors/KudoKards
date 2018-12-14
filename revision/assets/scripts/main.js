$(function () {

    var kudos = [];

    $.getJSON('https://api.myjson.com/bins/16wav2', function (data) {
        $.each(data, function (key, val) {
            var kudo = "<div class='card all " + val.quality + "'><a href=''><div class='cardBack'></div><div class='cardFront'><img src='" + val.imagesrc + "'/></div><div><h3>" + val.name + "</h3></div></a></div>"
            $(kudo).appendTo(".cardFocus");
        });

    });

});