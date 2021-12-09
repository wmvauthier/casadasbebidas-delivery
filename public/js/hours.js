$(document).ready(function () {
    checkToken();
    DAOgetHours();
});

$("#btnDAOHours").click(function () {
    DAOUpdateHours();
});

function DAOgetHours() {
    var response = httpGet('/usuarios/checkHours');
    $('#inicioUpd').val(response.checkHours[0].startHour);
    $('#terminoUpd').val(response.checkHours[0].endHour);
}

function DAOUpdateHours() {

    var inicio = $('#inicioUpd').val();
    var termino = $('#terminoUpd').val();

    var url = `/usuarios/checkHours`;
    var data = `inicio=${inicio}&termino=${termino}`;

    httpPut(url, data);

    window.location.href = "/home";

}
