const mongoose = require('../mongoose.js')

const DisplayGiftConfigModel = new mongoose.Schema({
    fontColor: String,
    textShadowColor: String,
})

const displayGiftConfigModel = mongoose.model('displayGiftConfig', DisplayGiftConfigModel)

module.exports = displayGiftConfigModel