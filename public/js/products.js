$(document).ready(function () {
    $('#productDataTable').show();
    checkToken();
    DAOgetAllProducts();
});

var productTableBody = $("#productTableBody")[0];

$("#btnPreRegisterProduct").click(function () {
    preRegisterProduct();
});

$("#btnDAODeleteProduct").click(function () {
    DAOdeleteProduct();
});

$("#btnDAOUpdateProduct").click(function () {
    DAOupdateProduct();
});

$("#btnDAORegisterProduct").click(function () {
    DAOregisterProduct();
});

function DAOgetAllProducts() {
    var response = httpGet('/products/api');
    fillProductTable(productTableBody, response.produtos);
}

function DAOregisterProduct() {

    var nome = $('#nome').val();
    var imagem = $('#imagem').val();
    var valor = $('#valor').val();
    var categoria = $('#categoria').val();

    var url = `/products/api`;
    var data = `nome=${nome}&imagem=${imagem}&valor=${valor}&categoria=${categoria}`;

    var response = httpPost(url, data);

    createProductToProductTable(productTableBody, response);
    cleanRegisterProductForm();
    $('#registerProductModal').modal('hide');

}

function DAOupdateProduct() {

    var id = $('#id_produtoUpd').val();
    var nome = $('#nomeUpd').val();
    var imagem = $('#imagemUpd').val();
    var valor = $('#valorUpd').val();
    var categoria = $('#categoriaUpd').val();

    var url = `/products/api`;
    var data = `id_produto=${id}&nome=${nome}&imagem=${imagem}&valor=${valor}&categoria=${categoria}`;

    httpPut(url, data);

    DAOgetAllProducts();
    cleanUpdateProductForm();
    $('#updateProductModal').modal('hide');

}

function preRegisterProduct() {
    cleanRegisterProductForm();
}

function preUpdateProduct(id) {

    cleanUpdateProductForm();
    var data = id.getAttribute("dataID");
    var response = httpGet(`/products/api/${data}`);
    response = response.produtos[0];

    $('#id_produtoUpd').val(response.id_produto);
    $('#nomeUpd').val(response.nome);
    $('#imagemUpd').val(response.imagem);
    $('#valorUpd').val(response.valor);
    $('#categoriaUpd').val(response.categoria);
    $('#updateProductModal').modal('show');

}

function preDeleteProduct(id) {

    cleanUpdateProductForm();
    var data = id.getAttribute("dataID");
    var response = httpGet(`/products/api/${data}`);
    response = response.produtos[0];

    $('#nomeDel').html(response.nome);
    $('#id_produtoDel').val(response.id_produto);
    $('#deleteProductModal').modal('show');

}

function DAOdeleteProduct() {

    var id = $('#id_produtoDel').val();
    httpDelete(`/products/api/${id}`);
    DAOgetAllProducts();
    $('#deleteProductModal').modal('hide');

}

function fillProductTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (product) {
        createProductToProductTable(table, product);
    });

}

//Insere Usuário na Lista de Usuários
function createProductToProductTable(table, product) {

    var div = document.createElement("div");

    div.innerHTML = `
        <div class="card" style="padding-top:0;">
            <img class="card-img-top" src="${product.imagem}" alt="Card image cap" style="object-fit: cover; max-height: 180px;">
            <div class="card-body">
                <h4 class="card-title"><a title="View Product" dataID="${product.id_produto}" 
                data-toggle="modal" data-target="#updateProductModal"
                data-backdrop="static" onclick="preUpdateProduct(this)">${product.nome}</a></h4>
                <p class="card-text">R$${product.valor}</p>
                <div class="row">
                    <div class="col">
                        <p class="btn btn-warning btn-rounded" dataID="${product.id_produto}" 
                        data-toggle="modal" data-target="#updateProductModal"
                        data-backdrop="static" onclick="preUpdateProduct(this)">Editar</p>
                    </div>
                    <div class="col">
                        <a href="#" class="btn btn-danger btn-rounded" dataID="${product.id_produto}"
                        data-toggle="modal" data-target="#deleteProductModal"
                        data-backdrop="static" onclick="preDeleteProduct(this)">Excluir</a>
                    </div>
                </div>
            </div>
        </div>`;

    div.classList = "col-12 col-md-2 col-lg-2";

    table.appendChild(div);

}

function cleanRegisterProductForm() {
    $('#registerProductForm')[0].reset();
}

function cleanUpdateProductForm() {
    $('#updateProductForm')[0].reset();
}
