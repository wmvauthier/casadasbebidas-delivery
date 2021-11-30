const mysql = require('../mysql');

exports.getPedidos = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM pedidos ORDER BY id_pedido DESC;';
        const result = await mysql.execute(query);
        return res.status(200).send({ pedidos: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getPedidosToBeAttended = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM pedidos WHERE andamento IN (0, 1) ORDER BY id_pedido DESC;';
        const result = await mysql.execute(query);
        return res.status(200).send({ pedidos: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getPedido = async (req, res, next) => {

    //0 => "PENDENTE"
    //1 => "A CAMINHO"
    //2 => "ENTREGUE"
    //3 => "CANCELADO"

    try {
        const query = 'SELECT * FROM pedidos WHERE id_pedido = ?;';
        const result = await mysql.execute(query, [req.params.id_pedido]);
        return res.status(200).send({ pedidos: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.insertPedido = async (req, res, next) => {

    var data_hora = req.body.data_hora.replaceAll("|", " ");

    try {
        const query = `INSERT INTO pedidos 
        (cliente, endereço, contato, ponto_referencia, forma_pagamento, itens, andamento, valor, data_hora) VALUES (?,?,?,?,?,?,?,?,?)`;

        const result = await mysql.execute(query, [
            req.body.cliente, req.body.endereco, req.body.contato,
            req.body.pontoReferencia, req.body.formaPagamento, req.body.itens,
            0, req.body.valor, data_hora
        ]);

        res.status(201).send({
            mensagem: 'Pedido #' + result.insertId + ' inserido com Sucesso',
            id_pedido: result.insertId
        });

    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.updatePedido = async (req, res, next) => {
    try {
        const query = `UPDATE pedidos SET 
        cliente = ?, endereço = ?, contato = ?, ponto_referencia = ?, itens = ?, andamento = ?, valor = ?`;
        const result = await mysql.execute(query, [
            req.body.nome, req.body.imagem, req.body.valor, req.body.id_pedido
        ]);
        res.status(202).send({
            mensagem: 'Pedido alterado com Sucesso',
            id_pedido: req.body.id_pedido
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.attendPedido = async (req, res, next) => {
    try {
        const query = `UPDATE pedidos SET andamento = '1' WHERE id_pedido = ?`;
        const result = await mysql.execute(query, [req.body.id_pedido]);
        res.status(202).send({
            mensagem: 'Produto alterado com Sucesso',
            id_pedido: req.body.id_pedido
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.finishPedido = async (req, res, next) => {
    try {
        const query = `UPDATE pedidos SET andamento = '2' WHERE id_pedido = ?`;
        const result = await mysql.execute(query, [req.body.id_pedido]);
        res.status(202).send({
            mensagem: 'Produto alterado com Sucesso',
            id_pedido: req.body.id_pedido
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.cancelPedido = async (req, res, next) => {
    try {
        const query = `UPDATE pedidos SET andamento = '3' WHERE id_pedido = ?`;
        const result = await mysql.execute(query, [req.body.id_pedido]);
        res.status(202).send({
            mensagem: 'Produto alterado com Sucesso',
            id_pedido: req.body.id_pedido
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.deletePedido = async (req, res, next) => {
    try {
        const query = 'DELETE FROM pedidos WHERE id_pedido = ?;';
        const result = await mysql.execute(query, [req.params.id_pedido]);
        return res.status(202).send({ mensagem: 'Pedido excluído com Sucesso', })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
