$(document).ready(function () {
    $('#churchDataTable').show();
    $('#personDataTable').hide();
    checkToken();
    DAOgetAllChurchs();
});

var churchTableBody = $("#churchTableBody")[0];

$("#btnPreRegisterChurch").click(function () {
    preRegisterChurch();
});

$("#btnDAODeleteChurch").click(function () {
    DAOdeleteChurch();
});

$("#btnDAOUpdateChurch").click(function () {
    DAOupdateChurch();
});

$("#btnDAORegisterChurch").click(function () {
    DAOregisterChurch();
});

function DAOgetAllChurchs() {
    var response = httpGet('/igrejas/api');
    fillChurchTable(churchTableBody, response.igrejas);
}

function DAOregisterChurch() {

    var nome = $('#nome').val();
    var endereco = $('#endereco').val();
    var endereco_numero = $('#endereco_numero').val();
    var endereco_complemento = $('#endereco_complemento').val();
    var endereco_pais = $('#endereco_pais').val();
    var endereco_estado = $('#endereco_estado').val();
    var endereco_cidade = $('#endereco_cidade').val();
    var endereco_bairro = $('#endereco_bairro').val();
    var endereco_telefone = $('#endereco_telefone').val();
    var pastor = $('#pastor').val();
    var regiao = $('#regiao').val();
    var classificacao = $('#classificacao').val();
    var sede = $('#sede').val();
    var rede_social_instagram = $('#rede_social_instagram').val();
    var rede_social_facebook = $('#rede_social_facebook').val();
    var rede_social_youtube = $('#rede_social_youtube').val();

    var url = `/igrejas/api`;
    var data = `nome=${nome}&endereco=${endereco}&endereco_numero=${endereco_numero}&endereco_complemento=${endereco_complemento}&endereco_pais=${endereco_pais}&endereco_estado=${endereco_estado}&endereco_cidade=${endereco_cidade}&endereco_bairro=${endereco_bairro}&endereco_telefone=${endereco_telefone}&pastor=${pastor}&regiao=${regiao}&classificacao=${classificacao}&sede=${sede}&rede_social_instagram=${rede_social_instagram}&rede_social_facebook=${rede_social_facebook}&rede_social_youtube=${rede_social_youtube}`;

    var response = httpPost(url, data);

    createChurchToChurchTable(churchTableBody, response);
    cleanRegisterChurchForm();
    $('#registerChurchModal').modal('hide');

}

function DAOupdateChurch() {

    var id = $('#id_igrejaUpd').val();
    var nome = $('#nomeUpd').val();
    var endereco = $('#enderecoUpd').val();
    var endereco_numero = $('#endereco_numeroUpd').val();
    var endereco_complemento = $('#endereco_complementoUpd').val();
    var endereco_pais = $('#endereco_paisUpd').val();
    var endereco_estado = $('#endereco_estadoUpd').val();
    var endereco_cidade = $('#endereco_cidadeUpd').val();
    var endereco_bairro = $('#endereco_bairroUpd').val();
    var endereco_telefone = $('#endereco_telefoneUpd').val();
    var pastor = $('#pastorUpd').val();
    var regiao = $('#regiaoUpd').val();
    var classificacao = $('#classificacaoUpd').val();
    var sede = $('#sedeUpd').val();
    var rede_social_instagram = $('#rede_social_instagramUpd').val();
    var rede_social_facebook = $('#rede_social_facebookUpd').val();
    var rede_social_youtube = $('#rede_social_youtubeUpd').val();

    var url = `/igrejas/api`;
    var data = `id_igreja=${id}&nome=${nome}&endereco=${endereco}&endereco_numero=${endereco_numero}&endereco_complemento=${endereco_complemento}&endereco_pais=${endereco_pais}&endereco_estado=${endereco_estado}&endereco_cidade=${endereco_cidade}&endereco_bairro=${endereco_bairro}&endereco_telefone=${endereco_telefone}&pastor=${pastor}&regiao=${regiao}&classificacao=${classificacao}&sede=${sede}&rede_social_instagram=${rede_social_instagram}&rede_social_facebook=${rede_social_facebook}&rede_social_youtube=${rede_social_youtube}`;

    httpPut(url, data);

    DAOgetAllChurchs();
    cleanUpdateChurchForm();
    $('#updateChurchModal').modal('hide');

}

function preRegisterChurch() {
    cleanRegisterChurchForm();
}

function preUpdateChurch(id) {

    cleanUpdateChurchForm();
    var data = id.getAttribute("dataID");
    var response = httpGet(`/igrejas/api/${data}`);
    response = response.igrejas[0];

    $('#id_igrejaUpd').val(response.id_igreja);
    $('#nomeUpd').val(response.nome);
    $('#enderecoUpd').val(response.endereco);
    $('#endereco_numeroUpd').val(response.endereco_numero);
    $('#endereco_complementoUpd').val(response.endereco_complemento);
    $('#endereco_estadoUpd').val(response.endereco_estado);
    $('#endereco_paisUpd').val(response.endereco_pais);
    $('#endereco_cidadeUpd').val(response.endereco_cidade);
    $('#endereco_bairroUpd').val(response.endereco_bairro);
    $('#endereco_telefoneUpd').val(response.endereco_telefone);
    $('#pastorUpd').val(response.pastor);
    $('#regiaoUpd').val(response.regiao);
    $('#classificacaoUpd').val(response.classificacao);
    $('#sedeUpd').val(response.sede);
    $('#rede_social_instagramUpd').val(response.rede_social_instagram);
    $('#rede_social_facebookUpd').val(response.rede_social_facebook);
    $('#rede_social_youtubeUpd').val(response.rede_social_youtube);
    $('#updateChurchModal').modal('show');

}

function preDeleteChurch(id) {

    cleanUpdateChurchForm();
    var data = id.getAttribute("dataID");
    var response = httpGet(`/igrejas/api/${data}`);
    response = response.igrejas[0];

    $('#nomeDel').html(response.nome);
    $('#id_igrejaDel').val(response.id_igreja);
    $('#deleteChurchModal').modal('show');

}

function DAOdeleteChurch() {

    var id = $('#id_igrejaDel').val();
    httpDelete(`/igrejas/api/${id}`);
    DAOgetAllChurchs();
    $('#deleteChurchModal').modal('hide');

}

function fillChurchTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (church) {
        createChurchToChurchTable(table, church);
    });

}

//Insere Usuário na Lista de Usuários
function createChurchToChurchTable(table, church) {

    var pt = '';

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");

    td1.innerHTML = church.id_igreja;
    td2.innerHTML = church.nome;
    td3.innerHTML = church.regiao;
    td4.innerHTML = pt;
    td5.innerHTML = church.classificacao;
    td6.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${church.id_igreja}" 
                        data-toggle="modal" data-target="#updateChurchModal"
                        data-backdrop="static" onclick="preUpdateChurch(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${church.id_igreja}"
                        data-toggle="modal" data-target="#deleteChurchModal"
                        data-backdrop="static" onclick="preDeleteChurch(this)">
                        Excluir</button>`;

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Nome");
    td3.setAttribute("data-title", "Área");
    td4.setAttribute("data-title", "Pastor");
    td5.setAttribute("data-title", "Classificação");
    td6.setAttribute("data-title", "Ações");

    td6.style = "text-align: center;"

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    table.appendChild(tr);

}

function cleanRegisterChurchForm() {
    $('#registerChurchForm')[0].reset();
}

function cleanUpdateChurchForm() {
    $('#updateChurchForm')[0].reset();
}
