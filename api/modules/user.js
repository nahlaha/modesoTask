const db = require('./dbConnection');
module.exports = {
    //GetAllOther users
    getAllByUserId: (userId, callbackfn) => {
        db.connect(() => {
            db.query(`SELECT * FROM Users WHERE Id != '${userId}'`, (error, result) => {
                callbackfn(error, result);
            });
        });
    },
    //GetById
    getById: (userId, callbackfn) => {
        db.connect(() => {
            db.query(`SELECT * FROM Users WHERE Id = '${userId}'`, (error, result) => {
                callbackfn(error, result);
            });
        });
    },
    //login
    login: (params, callbackfn) => {
        db.connect(() => {
            db.query(`SELECT * FROM users WHERE username = '${params.userName}' and password = '${params.password}' LIMIT 1`, (error, result) => {
                callbackfn(error, result);
            });
        });
    },
    //create new user
    create: (params, callbackfn) => {
        db.connect(() => {
            var insertQuery = `INSERT INTO Users (UserName, Password, FullName, Email)
             VALUES ('${params.userName}', '${params.password}', '${params.fullName}', '${params.email}')`;
            db.query(insertQuery, (error, result) => {
                callbackfn(error, result);
            })
        });
    },
    //update user
    update: (params, callbackfn) => {
        db.connect(() => {
            var updateQuery = `UPDATE Users SET UserName = '${params.data.username}', Password = '${params.data.password}', 
            FullName = '${params.data.fullname}', Email = '${params.data.email}' WHERE Id = '${params.id}'`;
            console.log(updateQuery, "updateQuery")
            db.query(updateQuery, (error, result) => {
                callbackfn(error, result);
            })
        });
    },
    //Delete user
    delete: (userId, callbackfn) => {
        db.connect(() => {
            var deleteQuery = `DELETE FROM  Users WHERE Id = '${userId}'`;
            db.query(deleteQuery, (error, result) => {
                callbackfn(error, result);
            })
        });
    }
};