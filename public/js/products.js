$(document).ready(function () {
    $('#orderDataTable').show();
    $('#personDataTable').hide();
    checkToken();
    DAOgetAllOrders();
});

var orderTableBody = $("#orderTableBody")[0];

$("#btnPreRegisterOrder").click(function () {
    preRegisterOrder();
});

$("#btnDAODeleteOrder").click(function () {
    DAOdeleteOrder();
});

$("#btnDAOUpdateOrder").click(function () {
    DAOupdateOrder();
});

$("#btnDAORegisterOrder").click(function () {
    DAOregisterOrder();
});

function DAOgetAllOrders() {
    var response = httpGet('/orders/api');
    fillOrderTable(orderTableBody, response.pedidos);
}

function DAOregisterOrder() {

    var nome = $('#nome').val();
    var imagem = $('#imagem').val();
    var valor = $('#valor').val();

    var url = `/orders/api`;
    var data = `nome=${nome}&imagem=${imagem}&valor=${valor}`;

    var response = httpPost(url, data);

    createOrderToOrderTable(orderTableBody, response);
    cleanRegisterOrderForm();
    $('#registerOrderModal').modal('hide');

}

function DAOupdateOrder() {

    var id = $('#id_produtoUpd').val();
    var nome = $('#nomeUpd').val();
    var imagem = $('#imagemUpd').val();
    var valor = $('#valorUpd').val();

    var url = `/orders/api`;
    var data = `id_produto=${id}&nome=${nome}&imagem=${imagem}&valor=${valor}`;

    httpPut(url, data);

    DAOgetAllOrders();
    cleanUpdateOrderForm();
    $('#updateOrderModal').modal('hide');

}

function preRegisterOrder() {
    cleanRegisterOrderForm();
}

function preUpdateOrder(id) {

    cleanUpdateOrderForm();
    var data = id.getAttribute("dataID");
    var response = httpGet(`/orders/api/${data}`);
    response = response.pedidos[0];

    $('#id_produtoUpd').val(response.id_produto);
    $('#nomeUpd').val(response.nome);
    $('#imagemUpd').val(response.imagem);
    $('#valorUpd').val(response.valor);
    $('#updateOrderModal').modal('show');

}

function preDeleteOrder(id) {

    cleanUpdateOrderForm();
    var data = id.getAttribute("dataID");
    var response = httpGet(`/orders/api/${data}`);
    response = response.pedidos[0];

    $('#nomeDel').html(response.nome);
    $('#id_produtoDel').val(response.id_produto);
    $('#deleteOrderModal').modal('show');

}

function DAOdeleteOrder() {

    var id = $('#id_produtoDel').val();
    httpDelete(`/orders/api/${id}`);
    DAOgetAllOrders();
    $('#deleteOrderModal').modal('hide');

}

function fillOrderTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (order) {
        createOrderToOrderTable(table, order);
    });

}

//Insere Usuário na Lista de Usuários
function createOrderToOrderTable(table, order) {

    var div = document.createElement("div");

    div.innerHTML = `
        <div class="card" style="padding-top:0;">
            <img class="card-img-top" src="${order.imagem}" alt="Card image cap" style="max-height:100%; max-width:100%;">
            <div class="card-body">
                <h4 class="card-title"><a title="View Order" dataID="${order.id_produto}" 
                data-toggle="modal" data-target="#updateOrderModal"
                data-backdrop="static" onclick="preUpdateOrder(this)">${order.nome}</a></h4>
                <p class="card-text">R$${order.valor}</p>
                <div class="row">
                    <div class="col">
                        <p class="btn btn-warning btn-rounded" dataID="${order.id_produto}" 
                        data-toggle="modal" data-target="#updateOrderModal"
                        data-backdrop="static" onclick="preUpdateOrder(this)">Editar</p>
                    </div>
                    <div class="col">
                        <a href="#" class="btn btn-danger btn-rounded" dataID="${order.id_produto}"
                        data-toggle="modal" data-target="#deleteOrderModal"
                        data-backdrop="static" onclick="preDeleteOrder(this)">Excluir</a>
                    </div>
                </div>
            </div>
        </div>`;

    div.classList = "col-12 col-md-2 col-lg-2";

    table.appendChild(div);

}

function cleanRegisterOrderForm() {
    $('#registerOrderForm')[0].reset();
}

function cleanUpdateOrderForm() {
    $('#updateOrderForm')[0].reset();
}
