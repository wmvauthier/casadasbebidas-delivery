const mysql = require('../mysql');

exports.getProdutos = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM produtos;';
        const result = await mysql.execute(query);
        return res.status(200).send({ produtos: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getProduto = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM produtos WHERE id_produto = ?;';
        const result = await mysql.execute(query, [req.params.id_produto]);
        return res.status(200).send({ produtos: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.insertProduto = async (req, res, next) => {
    try {
        const query = `INSERT INTO produtos (nome, imagem, valor) VALUES (?,?,?)`;
        const result = await mysql.execute(query, [
            req.body.nome, req.body.imagem, req.body.valor
        ]);
        res.status(201).send({
            mensagem: 'Produto inserido com Sucesso',
            id_produto: result.insertId,
            nome: req.body.nome,
            imagem: req.body.imagem,
            valor: req.body.valor,
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.updateProduto = async (req, res, next) => {
    try {
        const query = `UPDATE produtos SET 
        nome = ?, imagem = ?, valor = ? WHERE id_produto = ?`;
        const result = await mysql.execute(query, [
            req.body.nome, req.body.imagem, req.body.valor, req.body.id_produto
        ]);
        res.status(202).send({
            mensagem: 'Produto alterado com Sucesso',
            id_produto: req.body.id_produto,
            nome: req.body.nome,
            imagem: req.body.imagem,
            valor: req.body.valor,
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.deleteProduto = async (req, res, next) => {
    try {
        const query = 'DELETE FROM produtos WHERE id_produto = ?;';
        const result = await mysql.execute(query, [req.params.id_produto]);
        return res.status(202).send({ mensagem: 'Produto excluído com Sucesso', })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
