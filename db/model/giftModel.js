const mongoose = require('../mongoose.js')

const GiftSchema = new mongoose.Schema({
    rid: Number,
    gift: {
        id: Number,
        type: {type: Number},
        name: String,
        count: Number,
        price: Number,
    },
    user: {
        id: Number,
        name: String,
    },
    ts: Number
})
const giftModel = mongoose.model('gifts', GiftSchema)

module.exports = giftModel