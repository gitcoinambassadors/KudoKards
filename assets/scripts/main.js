$(function () {

    var kudos = [];

    $.getJSON('https://api.myjson.com/bins/fyzvw', function (data) {
        $.each(data, function (key, val) {
            var kudo = "<div class='card all " + val.quality + "'><a class='myBtn' href='#" + val.idnumber + "' rel='modal:open'><div class='cardBack'></div><div class='cardFront'><img src='" + val.imagesrc + "'/></div><div><h3>" + val.name + "</h3></div></a></div>"
            var modal = "<div id='" + val.idnumber + "' class='modal'><div><p>Your selected kudo:</p><div><div><img src='" + val.imagesrc + "' /></div><div><h3>" + val.name + "</h3><p>" + val.description + "</p></div></div></div><div><p>Generate your custom KudoKard:</p><input type='text' name='qr' placeholder='Airdrop Link (coming soon)' disabled /><input id='message' type='text' name='message' placeholder='What would you like the message to be?' /><input id='sender' type='text' name='from' placeholder='Who is it from?' /></div><div><button class='Button download' id='thisButton' onclick='printDiv('printableArea')'>Download PDF</button></div></div>"
            $(kudo).appendTo("#cardFocus");
            $(modal).appendTo("#popupModals");
        });

    });

});

var $btns = $('.btn').click(function () {
    if (this.id == 'all') {
        $('#cardFocus > div').fadeIn(450);
    } else {
        var $el = $('.' + this.id).fadeIn(450);
        $('#cardFocus > div').not($el).hide();
    }
    $btns.removeClass('active');
    $(this).addClass('active');
})