const path = require("path");
const db = require('./dbConnection');
const file = require("fs");
const pathImages = '../public/images/';
module.exports = {
    //GetAll
    getAllByUserId: (userId, callbackfn) => {
        db.connect(() => {
            db.query(`SELECT * FROM Notes WHERE CreatedBy = '${userId}'`, (error, result) => {
                callbackfn(error, result);
            });
        });
    },
    //GetById
    getById: (id, callbackfn) => {
        db.connect(() => {
            db.query(`SELECT * FROM Notes WHERE Id = '${id}'`, (error, result) => {
                callbackfn(error, result);
            });
        });
    },
    //create note
    create: (params, callbackfn) => {
        var imageUrl = pathImages + Math.floor(100000 + Math.random() * 900000) + '.png';
        var imagePath = path.join(__dirname, imageUrl);
        db.connect(() => {
            var insertQuery = `INSERT INTO Notes (Text, ImageUrl, CreatedBy)
             VALUES ('${params.text}', '${imageUrl}', '${params.userId}')`;
            db.query(insertQuery, (error, result) => {
                if (result)
                    file.writeFileSync(imagePath, params.image, 'base64', (e) => console.log(e));
                callbackfn(error, result);
            })
        });
    },
    //update note
    update: (params, callbackfn) => {
        var imageUrl = pathImages + Math.floor(100000 + Math.random() * 900000) + '.png';
        var imagePath = path.join(__dirname, imageUrl);
        db.connect(() => {
            var updateQuery = `UPDATE Notes SET Text = '${params.data.text}', ImageUrl = '${imageUrl}', 
            CreatedBy = '${params.data.userId}' WHERE Id = '${params.id}'`;
            db.query(updateQuery, (error, result) => {
                if (result)
                    if (params.image) file.writeFileSync(imagePath, params.image, 'base64', (e) => console.log(e));
                callbackfn(error, result);
            })
        });
    },
    //Delete note
    delete: (id, callbackfn) => {
        db.connect(() => {
            var deleteQuery = `DELETE FROM Notes WHERE Id = '${id}'`;
            db.query(deleteQuery, (error, result) => {
                callbackfn(error, result);
            })
        });
    },
    //share note
    shareNote: (params, callbackfn) => {
        db.connect(() => {
            var values = [];
            params.users.forEach(userId => {
                values.push(params.noteId, userId);
            });
            var insertQuery = `INSERT INTO ShardNotes (NoteId, UserId) VALUES ?`;
            db.query(insertQuery, values, (error, result) => {
                callbackfn(error, result);
            });
        });
    },
    //unshare note
    unshareNote: (params, callbackfn) => {
        db.connect(() => {
            var values = [];
            params.users.forEach(userId => {
                values.push(params.noteId, userId);
            });
            var deleteQuery = `DELETE FROM ShardNotes WHERE (NoteId, UserId) IN ?`;
            db.query(deleteQuery, values, (error, result) => {
                callbackfn(error, result);
            })
        });
    }
};