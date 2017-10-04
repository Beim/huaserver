const mongoose = require('../mongoose.js')

const OnlineMsgSchema = new mongoose.Schema({
    rid: Number,
    number: Number,
    ts: Number,
})
const onlineMsgModel = mongoose.model('onlineMsgs', OnlineMsgSchema)

module.exports = onlineMsgModel