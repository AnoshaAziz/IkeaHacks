const mongoose = require('mongoose');

module.exports = function () {

    mongoose.connect('mongodb://localhost:27017/IkeaHacksDb').then(() => { console.log("Connecting to Database") })

}