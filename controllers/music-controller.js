const mysql = require('../mysql');

exports.getAllMusics = async (req, res, next) => {
    try {
        const query = `SELECT * FROM musics;`;
        const result = await mysql.execute(query);
        return res.status(200).send({ musics: result })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}