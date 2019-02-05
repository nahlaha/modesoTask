const express = require('express');
const bodyParser = require('body-parser');
var store = require('./modules/store');
const port = 8080;
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/login', (req, res) => {
    store.user.login(req.body, (error, result) => {
        if (error)
            res.json(error);
        else
            res.json(result);
    });
});
app.post('/register', (req, res) => {
    store.user.create(req.body, (error, result) => {
        if (error)
            res.json(error);
        else {
            if (result.insertId > 0)
                res.json(req.body);
            else
                res.json(result);
        }
    });
});
app.put('/updateUser/:id', (req, res) => {
    var params = {
        "id": req.params.id,
        "data": req.body
    };
    store.user.update(params, (error, result) => {
        if (error)
            res.json(error);
        else {
            if (result.affectedRows > 0)
                res.json(req.body);
            else
                res.json(result);
        }
    });
});
app.delete('/deleteuser/:id', (req, res) => {
    store.user.delete(req.params.id, (error, result) => {
        if (error)
            res.json(error);
        else
            res.json(result);

    });
});
app.get('/user/:id', (req, res) => {
    store.user.getById(req.params.id, (error, result) => {
        if (error)
            res.json(error);
        else
            res.json(result);
    });
});
app.post('/createnote', (req, res) => {
    store.note.create(req.body, (error, result) => {
        if (error)
            res.json(error);
        else
            res.json(result);
    });
});
app.put('/updatenote/:id', (req, res) => {
    var params = {
        "id": req.params.id,
        "data": req.body
    };
    store.note.update(params, (error, result) => {
        if (error)
            if (error)
                res.json(error);
            else {
                if (result.affectedRows > 0)
                    res.json(req.body);
                else
                    res.json(result);
            }
    });
});
app.delete('/deletenote/:id', (req, res) => {
    store.note.delete(req.params.id, (error, result) => {
        if (error)
            res.json(error);
        else
            res.json(result);
    });
});
app.get('/note/:id', (req, res) => {
    store.note.getById(req.params.id, (error, result) => {
        if (error)
            res.json(error);
        else
            res.json(result);
    });
});
app.get('/notes/:userId', (req, res) => {
    store.note.getAllByUserId(req.params.userId, (error, result) => {
        if (error)
            res.json(error);
        else
            res.json(result);
    });
});
app.get('/users/:userId', (req, res) => { //get other users
    store.user.getAllByUserId(req.params.userId, (error, result) => {
        if (error)
            res.json(error);
        else
            res.json(result);
    });
});
app.get('/sharednote/:noteId', (req, res) => {
    var params = {
        "noteId": req.params.noteId,
        "users": req.body
    }
    store.note.shareNote(params, (error, result) => {
        if (error)
            res.json(error);
        else
            res.json(result);
    });
});
app.delete('/unsharenote/:noteId', (req, res) => {
    var params = {
        "noteId": req.params.noteId,
        "users": req.body
    };
    store.note.unshareNote(params, (error, result) => {
        if (error)
            res.json(error);
        else
            res.json(result);
    });
});
app.listen(port);