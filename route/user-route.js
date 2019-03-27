const express = require('express');
const router = express.Router();
const Controller = require('../controller/user-controller');

router.post('/', function (req, res) {
    Controller.addUser(req.body).then(function (data) {
        res.status(data.status).send({ message: data.message });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});
router.get('/', function (req, res) {
    Controller.getUsers().then(function (data) {
        res.status(data.status).send({ data: data.userdata });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});
router.get('/:id', function (req, res) {
    Controller.getOneUser(req.params.id).then(function (data) {
        res.status(data.status).send({ data: data.user });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});
router.delete('/:id', function (req, res) {
    Controller.deleteUser(req.params.id).then(function (data) {
        res.status(data.status).send({ data: data.message });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});

module.exports = router;