const mongoose = require('../dbschema/dbconfig');
const UserSchema = mongoose.model('User');

var Controller = function () {
    this.addUser = function (data) {
        return new Promise(function (resolve, reject) {
            var User = UserSchema({
                name: data.name,
                username: data.username,
                password: data.password,
                email: data.email,
                userlevel: data.userlevel
            });
            User.save().then(function () {
                resolve({ status: 200, message: "Successfully Added !" });
            }).catch(function (reason) {
                reject({ status: 404, message: "Error: " + reason });
            })
        });
    };
    this.getUsers = function () {
        return new Promise(function (resolve, reject) {
            UserSchema.find().exec().then(function (value) {
                resolve({ status: 200, userdata: value });
            }).catch(function (reason) {
                reject({ status: 404, message: "Not Found: " + reason });
            })
        })
    };
    this.getOneUser = function (id) {
        return new Promise(function (resolve, reject) {
            UserSchema.findOne({ username: id }).exec().then(function (value) {
                resolve({ status: 200, user: value });
            }).catch(function (reason) {
                reject({ status: 404, message: "ID not found: " + reason });
            })
        })
    };
    this.login = function (data) {
        return new Promise(function (resolve, reject) {
            UserSchema.findOne({ username: data.username }).exec().then(function (value) {
                if(value.password == data.password){
                    resolve({ status: 200, message: "Welcome "+value.name, logged: true });
                } else {
                    reject({ status: 401, message: "Incorrect Password !", logged: false });
                }
            }).catch(function (reason) {
                reject({ status: 401, message: "User not found: ", logged: false });
            })
        })
    };
    this.deleteUser = function (id) {
        return new Promise(function (resolve, reject) {
            UserSchema.remove({ username: id }).then(function () {
                resolve({ status: 200, message: "Deleted" });
            }).catch(function (reason) {
                reject({ status: 404, message: "ID not found: " + reason });
            })
        })
    };
};

module.exports = new Controller();
