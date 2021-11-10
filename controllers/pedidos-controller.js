const mysql = require('../mysql');

exports.getPedidos = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM pedidos;';
        const result = await mysql.execute(query);
        return res.status(200).send({ pedidos: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getPedido = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM pedidos WHERE id_pedido = ?;';
        const result = await mysql.execute(query, [req.params.id_pedido]);
        return res.status(200).send({ pedidos: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.insertPedido = async (req, res, next) => {
    try {
        const query = `INSERT INTO pedidos 
        (cliente, endereço, contato, ponto_referencia, itens, andamento, valor) VALUES (?,?,?,?,?,?,?)`;
        const result = await mysql.execute(query, [
            req.body.nome, req.body.imagem, req.body.valor
        ]);
        res.status(201).send({
            mensagem: 'Pedido inserido com Sucesso',
            id_pedido: result.insertId
        })
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

exports.deletePedido = async (req, res, next) => {
    try {
        const query = 'DELETE FROM pedidos WHERE id_pedido = ?;';
        const result = await mysql.execute(query, [req.params.id_pedido]);
        return res.status(202).send({ mensagem: 'Pedido excluído com Sucesso', })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
