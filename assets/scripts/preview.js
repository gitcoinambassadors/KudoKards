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
// kudoMessage
var senderMessage = getParameterByName('msg');
document.getElementById("messageField").innerHTML = senderMessage;

var senderName = getParameterByName('from');
document.getElementById("senderField").innerHTML = senderName;

var href = getParameterByName('href');
document.getElementById("claim").
