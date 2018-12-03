$(function () {


    var kudos = [];

    $.getJSON('https://api.myjson.com/bins/1exfta', function (data) {
        $.each(data, function (key, val) {
            var kudo = "<div class='kudo-card'><div></div><div><h3>" + val.name + "</h3><p>" + val.description + "</p></div><div><a href='" + +"'>Print</a></div></div>"
            $(kudo).appendTo(".appendCards");
        });

    });

})