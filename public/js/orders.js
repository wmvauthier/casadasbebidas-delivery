$(document).ready(function () {

    var table = $('#example').DataTable({
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        buttons: ['copy', 'excel', 'pdf']
    });

    table.buttons().container()
        .appendTo('#example_wrapper .col-md-6:eq(0)');



});

window.onload = getOrders();

function checkAll(bx) {
    var cbs = document.getElementsByTagName('input');
    for (var i = 0; i < cbs.length; i++) {
        if (cbs[i].type == 'checkbox') {
            cbs[i].checked = bx.checked;
        }
    }
}

function getOrders() {

    var result = httpGet('/orders/api');

    result.pedidos.forEach(pedido => {

        var andamento = 0;

        if (pedido.andamento == 0) {
            andamento = "PENDENTE";
        } else if (pedido.andamento == 1) {
            andamento = "A CAMINHO";
        } else if (pedido.andamento == 2) {
            andamento = "ENTREGUE";
        } else if (pedido.andamento == 3) {
            andamento = "CANCELADO";
        } else {
            andamento = pedido.andamento;
        }

        $('#orderBody').append(`
            <tr>
                <td>#${pedido.id_pedido}</td>
                <td>${pedido.cliente}</td>
                <td>${pedido.contato}</td>
                <td>${andamento}</td>
                <td>${pedido.data_hora}</td>
                <td>R$${pedido.valor}</td>
                <td style="text-align: center;">
                    <a href="#" class="btn btn-danger btn-rounded" dataID="${pedido.id_pedido}"
                    data-toggle="modal" data-target="#detailOrderModal"
                    data-backdrop="static" onclick="preDetailOrder(this)">Detalhar</a>
                </td>
            </tr>
        `);
    });

}

function preDetailOrder(id) {

    var data = id.getAttribute("dataID");
    var response = httpGet(`/orders/api/${data}`);
    response = response.pedidos[0];

    $('#titleDetail').html("Detalhes do Pedido #" + response.id_pedido);
    $('#idDetail').html("<b>ID:</b> #" + response.id_pedido);
    $('#nomeDetail').html("<b>Nome:</b> " + response.cliente);
    $('#enderecoDetail').html("<b>Endereço:</b> " + response.endereço);
    $('#contatoDetail').html("<b>Contato:</b> " + response.contato);
    $('#pontoReferenciaDetail').html("<b>Ponto de Referência:</b> " + response.ponto_referencia);

    if (response.andamento == 0) {
        $('#andamentoDetail').html("<b>Andamento:</b> " + "PENDENTE");
    } else if (response.andamento == 1) {
        $('#andamentoDetail').html("<b>Andamento:</b> " + "A CAMINHO");
    } else if (response.andamento == 2) {
        $('#andamentoDetail').html("<b>Andamento:</b> " + "ENTREGUE");
    } else if (response.andamento == 3) {
        $('#andamentoDetail').html("<b>Andamento:</b> " + "CANCELADO");
    } else {
        $('#andamentoDetail').html("<b>Andamento:</b> " + response.andamento);
    }

    $('#formaPagamentoDetail').html("<b>Forma de Pagamento:</b> " + response.forma_pagamento);
    $('#valorDetail').html("<b>Valor Total:</b> " + "R$" + response.valor);
    $('#dataHoraDetail').html("<b>Data/Hora do Pedido:</b> " + response.data_hora);
    $('#itensDetail').html("");
    var itens = response.itens.split(";");

    itens.forEach(item => {
        if (item != "") {
            var detailsItem = item.split("|");
            $('#itensDetail').append("<tr><td>" + detailsItem[1] + "</td><td>" + detailsItem[0] + "</td><td>R$" + detailsItem[2] + "</td></tr>");
        }
    });

}