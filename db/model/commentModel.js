const mongoose = require('../mongoose.js')

const CommentSchema = new mongoose.Schema({
    rid: Number,
    comment: String,
    user: {
        id: Number,
        name: String,
        isAdmin: Boolean,
        isVIP: Boolean,
        isSVIP: Boolean,
        guard: Number,
        level: Number,
    },
    ts: Number
})
const commentModel = mongoose.model('comments', CommentSchema)

module.exports = commentModel