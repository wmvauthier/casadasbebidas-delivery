var orderTableBody = $("#orderTableBody")[0];

$(document).ready(function () {

    $("#btnDAOAttendOrder").click(function () {
        DAOattendOrder();
    });

    $("#btnDAOFinishOrder").click(function () {
        DAOfinishOrder();
    });

    $("#btnDAOCancelOrder").click(function () {
        DAOcancelOrder();
    });

    checkToken();

    DAOgetAllOrders();

});

function DAOgetAllOrders() {

    $("#orderCards").empty();

    var result = httpGet('/orders/api/getPedidosToBeAttended');
    //activateButtonsCarousel(result.pedidos.length);

    result.pedidos.forEach(produto => {
        createOrder(produto);
    });

    if ($("#orderCards").html() == "")
        $("#orderCards").append('<div style="text-align: center;">Todos os pedidos já foram atendidos!</div>');

    //fillOrderTable(orderTableBody, response.pedidos);

}

function createOrder(produto) {

    var produtosLst = produto.itens.split(";");
    var produtosStr = "";
    var buttonStr = "";

    produtosLst.forEach(element => {
        if (element != "") {

            var produtoSplitted = element.split("|");
            var qtd = produtoSplitted[1];

            if (qtd < 10)
                qtd = "0" + produtoSplitted[1];

            var prd = {
                nome: produtoSplitted[0],
                qtd: qtd,
                valor: produtoSplitted[2]
            }

            produtosStr += `
                <div class="stats">
                    <div>
                        <strong>ITEM</strong> ${prd.nome}
                    </div>

                    <div>
                        <strong>QTD</strong> ${prd.qtd}
                    </div>

                    <div>
                        <strong>VALOR</strong> R$${prd.valor}
                    </div>
                </div>
            `;

        }
    });

    if (produto.andamento == 0) {

        buttonStr += `
        <a href="#" class="Cbtn Cbtn-primary btn-rounded" dataID="${produto.id_pedido}"
                                data-toggle="modal" data-target="#attendOrderModal"
                                data-backdrop="static" onclick="preAttendOrder(this)">Atender</a>
                                <a href="#" class="Cbtn Cbtn-danger" dataID="${produto.id_pedido}"
                                data-toggle="modal" data-target="#cancelOrderModal"
                                data-backdrop="static" onclick="preCancelOrder(this)">Cancelar</a>
        `;

    } else if (produto.andamento == 1) {

        buttonStr += `
        <a href="#" class="Cbtn Cbtn-primary btn-rounded" dataID="${produto.id_pedido}"
                                data-toggle="modal" data-target="#finishOrderModal"
                                data-backdrop="static" onclick="preFinishOrder(this)">Finalizar</a>
                                <a href="#" class="Cbtn Cbtn-danger" dataID="${produto.id_pedido}"
                                data-toggle="modal" data-target="#cancelOrderModal"
                                data-backdrop="static" onclick="preCancelOrder(this)">Cancelar</a>
        `;

    }

    var datNow = new Date();
    var dat1 = produto.data_hora.split(" ");
    var dat2 = dat1[0].split(":");
    var dat3 = dat1[1].split("/");
    var dat = new Date(dat3[2], dat3[1] - 2, dat3[0], dat2[0], dat2[1], 0, 0);
    var timeDifference = "";

    const diffTime = Math.abs(datNow - dat);
    const diffSeconds = Math.ceil(diffTime / (1000));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffSeconds > 60) {
        if (diffMinutes > 60) {
            if (diffHours > 24) {
                if (diffDays > 6) {
                    if (diffDays > 30) {
                        timeDifference = "+" + diffDays + "m";
                    } else {
                        timeDifference = "+" + diffDays + "d";
                    }
                } else {
                    timeDifference = "+" + diffDays + "d";
                }
            } else {
                timeDifference = "+" + diffHours + "h";
            }
        } else {
            timeDifference = diffMinutes + "min";
        }
    } else {
        timeDifference = diffSeconds + "s";
    }

    $("#orderCards").append($(`

    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                <div class="tile" style="border: 1px solid lightgray; border-radius: 5px;">
                    <div class="wrapper">

                        <div class="headerCard">
                            #${produto.id_pedido} - ${produto.cliente}
                            <div class="headerCardSubtitle">${produto.endereço} - ${produto.ponto_referencia}</div>
                            <div class="headerCardSubtitle">${produto.contato}</div>
                        </div>

                        <div class="dates">
                            <div class="start">
                                <strong>DATA DO PEDIDO</strong>${produto.data_hora}
                                <span></span>
                            </div>
                            <div class="ends">
                                <strong>TEMPO DE ESPERA</strong> ${timeDifference}
                            </div>
                        </div>

                        <div class="dates">
                            <div class="start">
                                <strong>FORMA DE PAGAMENTO</strong>${produto.forma_pagamento}
                                <span></span>
                            </div>
                            <div class="ends">
                                <strong>VALOR</strong> R$${produto.valor}
                            </div>
                        </div>

                        ${produtosStr}

                        <div class="footer">
                            ${buttonStr}
                        </div>
                    </div>
                </div> 
            </div>

    `));

}

function DAOcancelOrder() {

    var id = $('#id_pedidoCancel').val();
    
    var url = `/orders/api/cancel`;
    var data = `id_pedido=${id}`;
    httpPut(url, data);

    DAOgetAllOrders();
    $('#cancelOrderModal').modal('hide');

}

function DAOfinishOrder() {

    var id = $('#id_pedidoFinish').val();

    var url = `/orders/api/finish`;
    var data = `id_pedido=${id}`;
    httpPut(url, data);

    DAOgetAllOrders();
    $('#finishOrderModal').modal('hide');

}

function DAOattendOrder() {

    var id = $('#id_pedidoAttend').val();
    var url = `/orders/api/attend`;
    var data = `id_pedido=${id}`;
    httpPut(url, data);

    DAOgetAllOrders();
    $('#attendOrderModal').modal('hide');

}

function preCancelOrder(id) {

    var data = id.getAttribute("dataID");
    var response = httpGet(`/orders/api/${data}`);
    response = response.pedidos[0];

    $('#idCancel').val(response.id_pedido);
    $('#nomeCancel').html(response.cliente);
    $('#enderecoCancel').html(response.endereço + " - " + response.ponto_referencia);
    $('#valorCancel').html("R$" + response.valor + " - " + response.forma_pagamento);
    $('#id_pedidoCancel').val(response.id_pedido);
    $('#cancelOrderModal').modal('show');

}

function preFinishOrder(id) {

    var data = id.getAttribute("dataID");
    var response = httpGet(`/orders/api/${data}`);
    response = response.pedidos[0];

    $('#idFinish').val(response.id_pedido);
    $('#nomeFinish').html(response.cliente);
    $('#enderecoFinish').html(response.endereço + " - " + response.ponto_referencia);
    $('#valorFinish').html("R$" + response.valor + " - " + response.forma_pagamento);
    $('#id_pedidoFinish').val(response.id_pedido);
    $('#finishOrderModal').modal('show');

}

function preAttendOrder(id) {

    var data = id.getAttribute("dataID");
    var response = httpGet(`/orders/api/${data}`);
    response = response.pedidos[0];

    $('#idAttend').val(response.id_pedido);
    $('#nomeAttend').html(response.cliente);
    $('#enderecoAttend').html(response.endereço + " - " + response.ponto_referencia);
    $('#valorAttend').html("R$" + response.valor + " - " + response.forma_pagamento);
    $('#id_pedidoAttend').val(response.id_pedido);
    $('#attendOrderModal').modal('show');

}

function activateButtonsCarousel(qtd) {

    var bodyWidth = $('body').width();
    var dataCarousel = $('.MultiCarousel')[0];
    var data = dataCarousel.getAttribute('data-items');

    if ((bodyWidth >= 1200 && qtd < data[6]) ||
        (bodyWidth >= 992 && qtd < data[4]) ||
        (bodyWidth >= 768 && qtd < data[2]) ||
        (qtd < data[0])) {
        $('.leftLst').addClass('hidden');
        $('.rightLst').addClass('hidden');
    } else {
        $('.leftLst').removeClass('hidden');
        $('.rightLst').removeClass('hidden');
    }

}

function fillOrderTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (order) {
        createOrderToOrderTable(table, order);
    });

}

//Insere Usuário na Lista de Usuários
function createOrderToOrderTable(table, order) {

    var pt = '';

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");

    td1.innerHTML = order.id_produto;
    td2.innerHTML = order.nome;
    td3.innerHTML = order.regiao;
    td4.innerHTML = pt;
    td5.innerHTML = order.classificacao;
    td6.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${order.id_produto}" 
                        data-toggle="modal" data-target="#updateOrderModal"
                        data-backdrop="static" onclick="preUpdateOrder(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${order.id_produto}"
                        data-toggle="modal" data-target="#deleteOrderModal"
                        data-backdrop="static" onclick="preDeleteOrder(this)">
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
