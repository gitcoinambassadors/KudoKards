$(function () {

    var kudos = [];

    $.getJSON('https://api.myjson.com/bins/16wav2', function (data) {
        $.each(data, function (key, val) {
            var kudo = "<div class='kudo-card all " + val.quality + "'><div><div><img src='" + val.imagesrc + "'/></div></div><div><h3>" + val.name + "</h3><p>" + val.description + "</p><a class='readMore' href='" + val.link + "'>Read More</></div><div><a href='" + val.link + "'>Print</a></div></div>"
            $(kudo).appendTo(".appendCards");
        });

    });

});