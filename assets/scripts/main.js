$(function () {

    var kudos = [];

    $.getJSON('https://api.myjson.com/bins/fyzvw', function (data) {
        $.each(data, function (key, val) {
            var kudo = "<div class='card all " + val.quality + "'><a class='myBtn' href='#" + val.idnumber + "' rel='modal:open'><div class='cardBack'></div><div class='cardFront'><img src='" + val.imagesrc + "'/></div><div><h3>" + val.name + "</h3></div></a></div>"
            var modal = "<div id='" + val.idnumber + "' class='modal'><div><p>Your selected kudo:</p><div><div><img src='" + val.imagesrc + "' /></div><div><h3>" + val.name + "</h3><p>" + val.description + "</p></div></div></div><div><p>Generate your custom KudoKard:</p><input type='text' name='qr' placeholder='Airdrop Link (coming soon)' disabled /><input id='message' type='text' name='message' placeholder='What would you like the message to be?' /><input id='sender' type='text' name='from' placeholder='Who is it from?' /></div><div><a class='Button download'>Download PDF</a></div></div>"
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

$('#messager').on('change', function() {
    $('#messageField').text( this.value );
});

$('#sender').on('change', function() {
    $('#senderField').text( this.value );
});



// TODO: Rewrite this to process printing func.
$("#thisButton").click(function () {
    var divContents = $("#printablearea").html();
    var printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write('<html><head><title>DIV Contents</title><link rel="stylesheet" href="../styles/card.css" type="text/css" />');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});

