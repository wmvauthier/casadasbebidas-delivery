const mysql = require('../mysql');

exports.getOnlyIgrejas = async (req, res, next) => {
    try {
        const query = `SELECT * FROM igrejas WHERE classificacao = 'Igreja';`;
        const result = await mysql.execute(query);
        return res.status(200).send({ igrejas: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getOnlyCongregations = async (req, res, next) => {
    try {
        const query = `SELECT * FROM igrejas WHERE classificacao = 'Congregação';`;
        const result = await mysql.execute(query);
        return res.status(200).send({ igrejas: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getIgrejas = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM igrejas;';
        const result = await mysql.execute(query);
        return res.status(200).send({ igrejas: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getIgreja = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM igrejas WHERE id_igreja = ?;';
        const result = await mysql.execute(query, [req.params.id_igreja]);
        return res.status(200).send({ igrejas: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.insertIgreja = async (req, res, next) => {
    try {
        const query = `INSERT INTO igrejas 
        (nome, endereco, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade,
            endereco_estado, endereco_pais, endereco_telefone, pastor, regiao, classificacao,
            sede, rede_social_instagram, rede_social_facebook, rede_social_youtube, imagem_igreja) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const result = await mysql.execute(query, [
            req.body.nome, req.body.endereco, req.body.endereco_numero, req.body.endereco_complemento,
            req.body.endereco_bairro, req.body.endereco_cidade, req.body.endereco_estado, req.body.endereco_pais,
            req.body.endereco_telefone, req.body.pastor, req.body.regiao, req.body.classificacao,
            req.body.sede, req.body.rede_social_instagram, req.body.rede_social_facebook, req.body.rede_social_youtube,
            req.body.imagem_igreja
        ]);
        res.status(201).send({
            mensagem: 'Igreja inserida com Sucesso',
            id_igreja: result.insertId,
            nome: req.body.nome,
            pastor: req.body.pastor,
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.updateIgreja = async (req, res, next) => {
    try {
        const query = `UPDATE igrejas SET 
        nome = ?, endereco = ?, endereco_numero = ?, endereco_complemento = ?, endereco_bairro = ?, endereco_cidade = ?,
            endereco_estado = ?, endereco_pais = ?, endereco_telefone = ?, pastor = ?, regiao = ?, classificacao = ?,
            sede = ?, rede_social_instagram = ?, rede_social_facebook = ?, rede_social_youtube = ?, imagem_igreja = ?
            WHERE id_igreja = ?`;
        const result = await mysql.execute(query, [
            req.body.nome, req.body.endereco, req.body.endereco_numero, req.body.endereco_complemento,
            req.body.endereco_bairro, req.body.endereco_cidade, req.body.endereco_estado, req.body.endereco_pais,
            req.body.endereco_telefone, req.body.pastor, req.body.regiao, req.body.classificacao,
            req.body.sede, req.body.rede_social_instagram, req.body.rede_social_facebook, req.body.rede_social_youtube,
            req.body.imagem_igreja, req.body.id_igreja
        ]);
        res.status(202).send({
            mensagem: 'Igreja alterada com Sucesso',
            id_igreja: req.body.id_igreja,
            nome: req.body.nome,
            pastor: req.body.pastor
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.deleteIgreja = async (req, res, next) => {
    try {
        const query = 'DELETE FROM igrejas WHERE id_igreja = ?;';
        const result = await mysql.execute(query, [req.params.id_igreja]);
        return res.status(202).send({ mensagem: 'Igreja excluída com Sucesso', })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}