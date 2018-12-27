$(document).ready(function(){
    $(function () {

        var kudos = [];

        $.getJSON('https://api.myjson.com/bins/fyzvw', function (data) {
            $.each(data, function (key, val) {
                var kudo = "<div class='card all " + val.quality + "'><a class='myBtn' href='#" + val.idnumber + "' rel='modal:open'><div class='cardBack'></div><div class='cardFront'><img src='" + val.imagesrc + "'/></div><div><h3>" + val.name + "</h3></div></a></div>"
                var modal = "<div id='" + val.idnumber + "' class='modal'><div><p>Your selected kudo:</p><div><div><img class='kudoImage' src='" + val.imagesrc + "' /></div><div><h3>" + val.name + "</h3><p>" + val.description + "</p></div></div></div><div><p>Generate your custom Gitcoin card:</p><form><input class='recipient' type='email' name='email' placeholder='What is the recipients email?' /><input class='message' type='text' name='message' placeholder='What is your message?' /><input class='sender' type='text' name='from' placeholder='What is your name?' /><input class='redeem' type='text' name='redeem' placeholder='Airdrop link (copy and paste directly).' /><input class='submit' type='submit' value='Send Card' /><input class='preview' type='button' value='Preview' /></form></div></div>"
                $(kudo).appendTo("#cardFocus");
                $(modal).appendTo("#popupModals");

                $('.preview').click(function(){
                    // Change this hardcoded link once the website is live.
                    var previewLink = 'https://gitcoinambassadors.github.io/KudoKards/preview.html?' + 'MSG=' + $(this).parent().children('.message').val() + 'FROM=' + $(this).parent().children('.sender').val() + 'IMAGEURL=' + $(this).parent().parent().parent().find('.kudoImage').attr('src') + 'CLAIMURL=' + $(this).parent().children('.redeem').val();
                    window.open(previewLink, "_blank");
                });
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
    });
});