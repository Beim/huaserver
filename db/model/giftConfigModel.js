const mongoose = require('../mongoose.js')

const GiftConfigSchema = new mongoose.Schema({
    name: String,
    icon_id: Number,
    img_basic: String,
})
const GiftConfigModel = mongoose.model('giftConfigs', GiftConfigSchema)

module.exports = GiftConfigModel