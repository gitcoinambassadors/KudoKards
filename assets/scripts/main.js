$(function () {

    var kudos = [];

    $.getJSON('https://api.myjson.com/bins/fyzvw', function (data) {
        $.each(data, function (key, val) {
            var kudo = "<div class='card all " + val.quality + "'><a class='myBtn' href='#" + val.idnumber + "' rel='modal:open'><div class='cardBack'></div><div class='cardFront'><img src='" + val.imagesrc + "'/></div><div><h3>" + val.name + "</h3></div></a></div>"
            var modal = "<div id='" + val.idnumber + "' class='modal'><div><p>Your selected kudo:</p><div><div><img src='" + val.imagesrc + "' /></div><div><h3>" + val.name + "</h3><p>" + val.description + "</p></div></div></div><div><p>Generate your custom Gitcoin card:</p><form><input class='recipient' type='email' name='email' placeholder='What is the recipients email?' /><input class='messager' type='text' name='message' placeholder='What is your message?' /><input class='sender' type='text' name='from' placeholder='What is your name?' /><input class='redeem' type='text' name='redeem' placeholder='Do you have an airdrop link?' /><input class='submit' type='submit' value='Send Card' /></form></div></div>"
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

// Generate preview link. parent > div > div > img
var previewLink = 'MSG=' + document.getElementById('messager').value + 'FROM=' + document.getElementById('sender').value + 'IMAGEURL=' + 'figurethisout' + 'CLAIMURL=' + document.getElementById('redeem').value;
console.log(previewLink);