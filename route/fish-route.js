const express = require('express');
const router = express.Router();
const Controller = require('../controller/fish-controller');

router.post('/', function (req, res) {
    Controller.addFish(req.body).then(function (data) {
        res.status(data.status).send({ message: data.message });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});
router.get('/', function (req, res) {
    Controller.getFish().then(function (data) {
        res.status(data.status).send({ data: data.fishdata });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});
router.get('/:id', function (req, res) {
    Controller.getOneFish(req.params.id).then(function (data) {
        res.status(data.status).send({ data: data.fish });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});
router.delete('/:id', function (req, res) {
    Controller.deleteFish(req.params.id).then(function (data) {
        res.status(data.status).send({ data: data.message });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});

module.exports = router;