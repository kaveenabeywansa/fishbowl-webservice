const mongoose = require('../dbschema/dbconfig');
const FishSchema = mongoose.model('Fish');

var Controller = function () {
    this.addFish = function (data) {
        return new Promise(function (resolve, reject) {
            var Fish = FishSchema({
                name: data.name,
                category: data.category,
                desc: data.desc,
                length: data.length,
                mass: data.mass,
                img: data.img
            });
            Fish.save().then(function () {
                resolve({ status: 200, message: "Successfully Added !" });
            }).catch(function (reason) {
                reject({ status: 404, message: "Error: " + reason });
            })
        });
    };
    this.getFish = function () {
        return new Promise(function (resolve, reject) {
            FishSchema.find().exec().then(function (value) {
                resolve({ status: 200, fishdata: value });
            }).catch(function (reason) {
                reject({ status: 404, message: "Not Found: " + reason });
            })
        })
    };
    this.getOneFish = function (id) {
        return new Promise(function (resolve, reject) {
            FishSchema.findOne({ _id: id }).exec().then(function (value) {
                resolve({ status: 200, fish: value });
            }).catch(function (reason) {
                reject({ status: 404, message: "ID not found: " + reason });
            })
        })
    }; this.deleteFish = function (id) {
        return new Promise(function (resolve, reject) {
            FishSchema.remove({ _id: id }).then(function () {
                resolve({ status: 200, message: "Deleted" });
            }).catch(function (reason) {
                reject({ status: 404, message: "ID not found: " + reason });
            })
        })
    };
};

module.exports = new Controller();