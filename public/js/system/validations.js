$(document).ready(function () {
    hideOptionalFields();
});

function validate() {

    var data_nascimento = ($('#data_nascimento').val().replace(/\D/g, "/"));
    var data_nascimentoUpd = ($('#data_nascimentoUpd').val().replace(/\D/g, "/"));

    if ($("#classificacao").val() == "Igreja") {
        $(".sedeArea").hide();
        $("#sede").val('');
    } else {
        $(".sedeArea").show();
    }

    if ($("#classificacaoUpd").val() == "Igreja") {
        $(".sedeAreaUpd").hide();
        $("#sedeUpd").val('');
    } else {
        $(".sedeAreaUpd").show();
    }

    if ($("#tipo").val() == "Congregado") {
        $(".selectCargo").html(`
            <option disabled selected></option>
            <option value="Nenhum">Nenhum</option>
        `);
        $("#cargo").val('Nenhum');
        $(".batismoArea").hide();
    } else if ($("#tipo").val() == "Pastor") {
        $(".selectCargo").html(`
            <option disabled selected></option>
            <option value="Pastor">Pastor</option>
        `);
        $("#cargo").val('Pastor');
    } else {
        fillSelectCargo();
        $(".batismoArea").show();
    }

    if ($("#tipoUpd").val() == "Congregado") {
        $(".selectCargo").html(`
            <option disabled selected></option>
            <option value="Nenhum">Nenhum</option>
        `);
        $("#cargoUpd").val('Nenhum');
        $(".batismoAreaUpd").hide();
    } else if ($("#tipoUpd").val() == "Pastor") {
        $(".selectCargo").html(`
            <option disabled selected></option>
            <option value="Pastor">Pastor</option>
        `);
        $("#cargo").val('Pastor');
    } else {
        fillSelectCargo()
        $(".batismoAreaUpd").show();
    }

    if (getAge(data_nascimento) > 18) {
        $(".responsavelArea").hide();
        $(".conjugeArea").show();
        $("#nome_responsavel").val('');
        $("#contato_responsavel").val('');
    } else {
        $(".conjugeArea").hide();
        $(".responsavelArea").show();
        $("#conjuge").val('');
    }

    if (getAge(data_nascimentoUpd) > 18) {
        $(".responsavelAreaUpd").hide();
        $(".conjugeAreaUpd").show();
        $("#nome_responsavelUpd").val('');
        $("#contato_responsavelUpd").val('');
    } else {
        $(".conjugeAreaUpd").hide();
        $(".responsavelAreaUpd").show();
        $("#conjugeUpd").val('');
    }

}

function hideOptionalFields() {
    $(".sedeArea").hide();
    $(".sedeAreaUpd").hide();
    $(".responsavelArea").hide();
    $(".responsavelAreaUpd").hide();
    $(".conjugeArea").hide();
    $(".conjugeAreaUpd").hide();
    $(".batismoArea").hide();
    $(".batismoAreaUpd").hide();
}