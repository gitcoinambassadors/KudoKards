$(document).ready(function () {
    $(function () {

        var kudos = [];

        (function () {
            emailjs.init("user_QP2mfvaNUnYF3MRDIGpSc");
        })();

        $.getJSON('https://api.myjson.com/bins/fyzvw', function (data) {
            $.each(data, function (key, val) {
                var kudo = "<div class='card all " + val.quality + "'><a class='myBtn' href='#" + val.idnumber + "' rel='modal:open'><div class='cardBack'></div><div class='cardFront'><img src='" + val.imagesrc + "'/></div><div><h3>" + val.name + "</h3></div></a></div>"
                var modal = "<div id='" + val.idnumber + "' class='modal'><div><p>Your selected kudo:</p><div><div><img class='kudoImage' src='" + val.imagesrc + "' /></div><div><h3>" + val.name + "</h3><p>" + val.description + "</p></div></div></div><div><p>Generate your custom Gitcoin card:</p><form class='form" + val.idnumber + "'><input class='hiddenLink' type='text' name='hidden_link' /><input class='sender' type='text' name='sender_name' placeholder='What is your name?' /><input class='message' type='text' name='message' placeholder='What is your message?' /><input class='recipientName' type='text' name='to_name' placeholder='What is the recipients name?'/><input class='recipient' type='email' name='reciepient_email' placeholder='What is the recipients email?' /><input class='redeem' type='text' name='link_send' placeholder='Do you have an Airdrop link? (paste directly)' /><input class='submit' type='submit' value='Send Card' /><input class='preview' type='button' value='Preview' /></form></div></div>"
                $(kudo).appendTo("#cardFocus");
                $(modal).appendTo("#popupModals");

                $('.preview').click(function () {
                    // Change this hardcoded link once the website is live.
                    var previewLink = 'https://gitcoinambassadors.github.io/KudoKards/preview.html?' + 'MSG=' + $(this).parent().children('.message').val() + 'FROM=' + $(this).parent().children('.sender').val() + 'IMAGEURL=' + $(this).parent().parent().parent().find('.kudoImage').attr('src') + 'CLAIMURL=' + $(this).parent().children('.redeem').val();
                    window.open(previewLink, "_blank");
                });

                var myform = $(".form" + val.idnumber);
                myform.submit(function (event) {
                    // Hardcorde link, change when website live.
                    var previewLink2 = 'https://gitcoinambassadors.github.io/KudoKards/preview.html?MSG=' + encodeURIComponent($(this).children('.message').val().trim()) + 'FROM=' + encodeURIComponent($(this).children('.sender').val().trim()) + 'IMAGEURL=' + $(this).parent().parent().find('.kudoImage').attr('src') + 'CLAIMURL=' + $(this).children('.redeem').val();
                    $('.hiddenLink').val(previewLink2);

                    event.preventDefault();

                    var params = myform.serializeArray().reduce(function (obj, item) {
                        obj[item.name] = item.value;
                        return obj;
                    }, {});

                    // Change to your service ID, or keep using the default service
                    var service_id = "default_service";

                    var template_id = "template_WeQDVhOc";
                    emailjs.send(service_id, template_id, params)
                        .then(function () {
                            alert("Sent!");
                            myform.find("button").text("Send");
                        }, function (err) {
                            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
                            myform.find("button").text("Send");
                        });
                    return false;
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