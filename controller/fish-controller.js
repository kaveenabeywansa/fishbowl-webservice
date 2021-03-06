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
                img: data.img,
                views: data.views
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
                value.views++;
                value.save();
                resolve({ status: 200, fish: value });
            }).catch(function (reason) {
                reject({ status: 404, message: "ID not found: " + reason });
            })
        })
    };
    this.getCategory = function (id) {
        return new Promise(function (resolve, reject) {
            FishSchema.find({ category: id }).exec().then(function (value) {
                resolve({ status: 200, fishdata: value });
            }).catch(function (reason) {
                reject({ status: 404, message: "Category Not Found: " + reason });
            })
        })
    };
    this.getSearchKeywords = function (id) {
        return new Promise(function (resolve, reject) {
            FishSchema.find({ desc: { "$regex": id, "$options": "i" } }).exec().then(function (value) {
                resolve({ status: 200, fishdata: value });
            }).catch(function (reason) {
                reject({ status: 404, message: "Category Not Found: " + reason });
            })
        })
    };
    this.editFishDetails = function (id, data) {
        return new Promise(function (resolve, reject) {
            FishSchema.findOne({ _id: id }).exec().then(function (value) {
                value.name = data.name;
                value.category = data.category;
                value.desc = data.desc;
                value.length = data.length;
                value.mass = data.mass;
                value.img = data.img;
                value.save();
                resolve({ status: 200, message: "Profile Updated Successfully !" });
            }).catch(function (reason) {
                reject({ status: 401, message: "Fish not found ! " });
            })
        })
    };
    this.deleteFish = function (id) {
        return new Promise(function (resolve, reject) {
            FishSchema.deleteOne({ _id: id }).then(function () {
                resolve({ status: 200, message: "Deleted" });
            }).catch(function (reason) {
                reject({ status: 404, message: "ID not found: " + reason });
            })
        })
    };
};

module.exports = new Controller();
