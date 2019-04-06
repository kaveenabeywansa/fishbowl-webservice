const express = require('express');
const router = express.Router();
const Controller = require('../controller/fileupload-controller');

router.post('/', function (req, res) {
    Controller.uploadFile(req.files).then(function (data) {
        res.status(data.status).send({ message: data.message, file: data.filename });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});
router.get('/', function (req, res) {
    Controller.getAllFiles().then(function (data) {
        res.status(data.status).send({ data: data.files });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});
router.get('/:id', function (req, res) {
    Controller.getFile(req.params.id).then(function (data) {
        res.writeHead(data.status, { 'Content-Type': data.contentType });
        res.end(data.binary); // send the image as a response
        // res.download("./uploads/20190327005115.jpg"); // directly downloads the file
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});
router.delete('/:id', function (req, res) {
    Controller.deleteFile(req.params.id).then(function (data) {
        res.status(data.status).send({ data: data.message });
    }).catch(function (reason) {
        res.status(reason.status).send({ message: reason.message });
    })
});

module.exports = router;