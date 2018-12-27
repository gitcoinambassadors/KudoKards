// Parse the URL parameter
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Declare paramURL from MSG string output.
var paramURL = getParameterByName('MSG');

// Get sender message.
var senderMessage = paramURL.substring(0, paramURL.indexOf('FROM='));
// Push sender message to message field in card.
document.getElementById("messageField").innerHTML = senderMessage;

// Get sender name.
var senderName = paramURL.split('FROM=').pop().split('IMAGEURL=')[0];
// Push sender name to name field in card.
document.getElementById("senderField").innerHTML = '- ' + senderName;

// Get url for Kudo image.
var kudoImage = paramURL.split('IMAGEURL=').pop().split('CLAIMURL=')[0];
// Push url to Kudo src image using JQuery.
$("#kudoImage").attr("src", kudoImage);

// Get url for Kudo airdrop claim link.
var airdropURL = paramURL.split('CLAIMURL=').pop();

// Ignore empty
if (airdropURL === null) {
    $('#claimButton').hide();
    $('#kudoImage').css("width", "90%");
} else {
    // Push url to Kudo claim button href using JQuery.
    $("#claimButton").attr("href", airdropURL);
}
