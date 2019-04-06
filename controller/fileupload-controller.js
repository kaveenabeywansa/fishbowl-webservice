const mongoose = require('../dbschema/dbconfig');
// const FileSchema = mongoose.model('Files');
var mime = require('mime-types')
var path = require('path');
var fs = require('fs');

function generateFileName() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = today.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var hour = today.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    var minutes = today.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var seconds = today.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var currentDate = year + '' + month + '' + day;
    var currentTime = hour + '' + minutes + '' + seconds;
    const todayString = currentDate + currentTime;
    return todayString;
};

var Controller = function () {
    this.uploadFile = function (uploadedFile) {
        return new Promise(function (resolve, reject) {
            if (uploadedFile) {
                var tempFile = uploadedFile.file;
                const newFileName = generateFileName() + path.extname(tempFile.name);
                tempFile.mv("./uploads/" + newFileName, function (err) {
                    if (err) {
                        console.error("Error: ", err);
                        reject({ status: 500, message: "Error: " + err });
                    } else {
                        resolve({ status: 200, message: "Successfully Uploaded !", filename: newFileName });
                    }
                })
            } else {
                reject({ status: 400, message: "Error: No file was uploaded !" });
            }
        });
    };
    this.getAllFiles = function () {
        return new Promise(function (resolve, reject) {
            //
        })
    };
    this.getFile = function (id) {
        return new Promise(function (resolve, reject) {
            try {
                const filePath = "./uploads/" + id;
                const contentType = mime.lookup(filePath);
                const fileExist = fs.existsSync(filePath);
                if (fileExist) {
                    var img = fs.readFileSync(filePath);
                    resolve({ status: 200, 'contentType': contentType, binary: img });
                } else {
                    reject({ status: 500, message: "File not found !" });
                }
            } catch (exception) {
                console.log(exception.message);
                reject({ status: 404, message: exception.message });
            }

        })
    }; this.deleteFile = function (id) {
        return new Promise(function (resolve, reject) {
            const filePath = "./uploads/" + id;
            const fileExist = fs.existsSync(filePath);
            if (fileExist) {
                fs.unlinkSync(filePath)
                resolve({ status: 200, message: "File Deleted !" });
            } else {
                reject({ status: 404, message: "File not found !" });
            }
        })
    };
};

module.exports = new Controller();