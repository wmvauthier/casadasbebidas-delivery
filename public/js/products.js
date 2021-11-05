$(document).ready(function () {
    $('#productDataTable').show();
    $('#personDataTable').hide();
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

    var url = `/products/api`;
    var data = `nome=${nome}&imagem=${imagem}&valor=${valor}`;

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

    var url = `/products/api`;
    var data = `id_produto=${id}&nome=${nome}&imagem=${imagem}&valor=${valor}`;

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

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    td1.innerHTML = product.id_produto;
    td2.innerHTML = product.imagem;
    td3.innerHTML = product.nome;
    td4.innerHTML = product.valor;
    td5.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${product.id_produto}" 
                        data-toggle="modal" data-target="#updateProductModal"
                        data-backdrop="static" onclick="preUpdateProduct(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${product.id_produto}"
                        data-toggle="modal" data-target="#deleteProductModal"
                        data-backdrop="static" onclick="preDeleteProduct(this)">
                        Excluir</button>`;

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Imagem");
    td3.setAttribute("data-title", "Nome");
    td4.setAttribute("data-title", "Valor");
    td5.setAttribute("data-title", "Ações");

    td5.style = "text-align: center;"

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    table.appendChild(tr);

}

function cleanRegisterProductForm() {
    $('#registerProductForm')[0].reset();
}

function cleanUpdateProductForm() {
    $('#updateProductForm')[0].reset();
}
