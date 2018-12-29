$(document).ready(function () {
    $(function () {

        var kudos = [];

        // Initialize EmailJS library.
        (function () {
            emailjs.init("user_QP2mfvaNUnYF3MRDIGpSc");
        })();

        // TODO: Refactor this so that there are not thousands of DOM elements.
        $.getJSON('list.json', function (data) { // list.json
            // Loop through each item in JSON list and generate cards, modals, and form-endpoints.
            $.each(data, function (key, val) {
                // Generate kudo cards.
                var kudo = "<div class='card all " + val.quality + "'><a class='myBtn' href='#" + val.idnumber + "' rel='modal:open'><div class='cardBack'></div><div class='cardFront'><img class='lazy' data-original='" + val.imagesrc + "'/></div><div><h3>" + val.name + "</h3></div></a></div>"
                // Generate kudo modals (with attachement to kudo ID).
                var modal = "<div id='" + val.idnumber + "' class='modal'><div><p>Your selected kudo:</p><div><div><img class='kudoImage' src='" + val.imagesrc + "' /></div><div><h3>" + val.name + "</h3><p>" + val.description + "</p></div></div></div><div><p>Generate your custom Gitcoin card:</p><form class='form" + val.idnumber + "'><input class='hiddenLink' type='text' name='hidden_link' /><input class='sender' type='text' name='sender_name' placeholder='What is your name?' /><input class='message' type='text' name='message' placeholder='What is your message?' /><input class='recipientName' type='text' name='to_name' placeholder='What is the recipients name?'/><input class='recipient' type='email' name='reciepient_email' placeholder='What is the recipients email?' /><input class='redeem' type='text' name='link_send' placeholder='Do you have an Airdrop link? (paste directly)' /><input class='submit' type='submit' value='Send Card' /><input class='preview' type='button' value='Preview' /></form></div></div>"
                //Append kudo + modal to appropriate Divs.
                $(kudo).appendTo("#cardFocus");
                $(modal).appendTo("#popupModals");

                //Setup preview button by generating link on press. URI encoding isn't necessary since this link is not being emailed but used directly by browser.
                $('.preview').click(function () {
                    // Change this hardcoded link depending on host.
                    var previewLink = 'https://gitcoin.cards/preview.html?' + 'MSG=' + $(this).parent().children('.message').val() + 'FROM=' + $(this).parent().children('.sender').val() + 'IMAGEURL=' + $(this).parent().parent().parent().find('.kudoImage').attr('src') + 'CLAIMURL=' + $(this).parent().children('.redeem').val();
                    window.open(previewLink, "_blank");
                });

                // Declare myform.
                var myform = $(".form" + val.idnumber);
                myform.submit(function (event) {
                    // Hardcorde link, change when website live.
                    var previewLink2 = 'https://gitcoin.cards/preview.html?MSG=' + encodeURIComponent($(this).children('.message').val().trim()) + 'FROM=' + encodeURIComponent($(this).children('.sender').val().trim()) + 'IMAGEURL=' + $(this).parent().parent().find('.kudoImage').attr('src') + 'CLAIMURL=' + $(this).children('.redeem').val();
                    $('.hiddenLink').val(previewLink2);

                    event.preventDefault();

                    var params = myform.serializeArray().reduce(function (obj, item) {
                        obj[item.name] = item.value;
                        return obj;
                    }, {});

                    // Use default service (Sendgrid) to send emails.
                    var service_id = "default_service";

                    var template_id = "template_WeQDVhOc";
                    emailjs.send(service_id, template_id, params)
                        .then(function () {
                            alert("Sent!");
                            // TODO: Refactor this to ensure that the button works.
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

    $("img.lazy").lazyload({
        threshold : 200
    });

});