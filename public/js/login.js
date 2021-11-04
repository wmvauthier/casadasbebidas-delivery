$(document).ready(function name(params) {
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
        window.location.href = "./home";
    }
    $("#validationFormLogin").hide(200);
});

$('#loginFormLogin').focus(function () { $("#validationFormLogin").hide(200); });
$('#passwordFormLogin').focus(function () { $("#validationFormLogin").hide(200); });

$("#formLogin").submit(function (event) {
    event.preventDefault();

    var login = $("#loginFormLogin").val();
    var password = $("#passwordFormLogin").val();

    var data = `login=${login}&senha=${password}`;
    var result = httpPost('/usuarios/login', data);

    if (result.token) {
        $('#validationFormLogin').addClass(result.class);
        $('#validationFormLogin').removeClass('alert-danger');
        if ($('#rememberFormLogin').is(":checked")) {
            localStorage.setItem('token', result.token);
        } else {
            sessionStorage.setItem('token', result.token);
        }
        window.location.href = "./home";
    } else {
        $('#validationFormLogin').addClass(result.class);
        $('#validationFormLogin').removeClass('alert-success');
    }

    $("#validationTitleFormLogin").html(result.title);
    $("#messageFormLogin").html(result.mensagem);
    $("#validationFormLogin").show(200);

});

