const mongoose = require('../mongoose.js')

const GiftConfigSchema = new mongoose.Schema({
    name: String,
    icon_id: Number,
})
const GiftConfigModel = mongoose.model('giftConfigs', GiftConfigSchema)

module.exports = GiftConfigModel