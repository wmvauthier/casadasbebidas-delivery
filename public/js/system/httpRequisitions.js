//var URL_API = 'https://casadasbebidas-delivery.herokuapp.com';
var URL_API = 'localhost:3000';

$('#logoutButton').click(function () {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
});

function checkToken() {
    if (!localStorage.getItem('token') && !sessionStorage.getItem('token')) {
        window.location.href = "./";
    }
}

function httpGet(theUrl) {
    theUrl = URL_API + theUrl
    var theUrl2 = "GET => " + theUrl
    console.log(theUrl2);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    console.log(xmlHttp.responseText);
    return JSON.parse(xmlHttp.responseText);
}

function httpPost(theUrl, data) {
    theUrl = URL_API + theUrl
    var theUrl2 = "POST => " + theUrl
    console.log(theUrl2);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(data);
    console.log(xmlHttp.responseText);
    return JSON.parse(xmlHttp.responseText);
}

function httpPut(theUrl, data) {
    theUrl = URL_API + theUrl
    var theUrl2 = "PUT => " + theUrl
    console.log(theUrl2);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log(xmlHttp.responseText);
    xmlHttp.send(data);
}

function httpDelete(theUrl) {
    theUrl = URL_API + theUrl
    var theUrl2 = "DELETE => " + theUrl
    console.log(theUrl2);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("DELETE", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    console.log(xmlHttp.responseText);
    return JSON.parse(xmlHttp.responseText);
}