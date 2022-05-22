const sqlite3 = require('sqlite3');
const db = require('../models/boardSchema.js');

module.exports.getAllBoards = (req, res, next) => {
    db.all('SELECT * FROM boards', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        //console.log(rows);
        res.status(200).json({ rows });
    });
};


module.exports.addNewBoard = (req, res, next) => {
    const reqBody = req.body;
    //console.log(reqBody);
    if (!reqBody.title) {
        res.status(400).json({ error: err.message });
        return;
    }
    db.run(
        'INSERT INTO boards (stage, title) VALUES (?,?)', [1, reqBody.title],
        function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.status(201).json({
                id: this.lastID,
                stage: 1,
                title: reqBody.title,
            });
        }
    );
};


module.exports.updateBoardByID = (req, res, next) => {
    if (!req.body.stage) {
        res.status(400).json({ error: err.message });
        return;
    }
    const { stage } = req.body;
    const id = +req.params.id;
    if (stage > 3 || stage < 1) {
        res.status(400).json({ error: "stage value must be in the range [1,3]." });
        return;
    }
    db.run(`UPDATE boards set stage = ${stage} where id = ${id}`, [],
        (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            //console.log(err, result);
            let upd;
            db.get('SELECT * FROM boards where id = ?', [id],
                function(err, ans) {
                    if (err) {
                        res.status(400).json({ error: err.message });
                        return;
                    }
                    res.status(200).json({
                        id,
                        stage,
                        title: ans.title
                    })
                });
        });
};


module.exports.getIndividualID = (req, res, next) => {
    const id = +req.params.id;
    db.get(`SELECT * FROM boards where id = ${id}`, [], function(err, row) {
        console.log(row);
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json(row);
    });
};


module.exports.deleteBoardByID = (req, res, next) => {
    const { id } = req.params;
    db.run(`DELETE FROM boards WHERE id = ?`, +id, function(err, result) {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }
        res.status(200).json({ deletedID: this.changes });
    });
};