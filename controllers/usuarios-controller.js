const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.users = async (req, res, next) => {
    try {
        const query = `SELECT * FROM usuarios;`;
        const result = await mysql.execute(query);
        return res.status(200).send({ usuarios: result })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error })
    }
}

exports.register = async (req, res, next) => {

    try {
        const query1 = 'SELECT * FROM usuarios WHERE login = ?';
        const result1 = await mysql.execute(query1, [req.body.login]);

        if (result1.length > 0) {
            res.status(409).send({ mensagem: "Login já cadastrado" });
        }

        bcrypt.hash(req.body.senha, 10, async (errBcrypt, hash) => {

            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

            try {
                const query2 = `INSERT INTO usuarios (login, senha) VALUES (?,?)`;
                const result2 = await mysql.execute(query2, [req.body.login, hash]);
                return res.status(201).send({
                    mensagem: "Usuário criado com sucesso",
                    id_usuario: result2.insertId,
                    login: req.body.login,
                });
            } catch (error) {
                return res.status(500).send({ error: error })
            }

        });

    } catch (error) {
        return res.status(500).send({ error: error })
    }

}

exports.login = async (req, res, next) => {

    try {

        const query = `SELECT * FROM usuarios WHERE login = '${req.body.login}'`;
        const results = await mysql.execute(query);

        if (results.length < 1) {
            return res.status(401).send({ title: "Acesso negado - login nao encontrado", class: "alert alert-danger", mensagem: "Usuário ou Senha incorretos" });
        }

        if (req.body.senha == results[0].senha) {

            let token = jwt.sign({
                id_usuario: results[0].id_usuario,
                login: results[0].login
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "360h"
                });

            return res.status(200).send({
                title: "Sucesso",
                class: "alert alert-success",
                mensagem: "Autenticado com sucesso",
                token: token
            });

        } else {
            return res.status(401).send({ title: "Acesso negado - erro no bcrypt", class: "alert alert-danger", mensagem: "Usuário ou Senha incorretos" });
        }

        return res.status(401).send({ title: "Acesso negado - não tem result", class: "alert alert-danger", mensagem: "Usuário ou Senha incorretos" });

    } catch (error) {
        return res.status(500).send({ error: error })
    }

}
