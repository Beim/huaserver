const mongoose = require('../mongoose.js')

const StarttimeSchema = new mongoose.Schema({
    rid: Number,
    start_ts: Number, // 任务开始运行时间
    stop_ts: Number, // 任务结束时间
    ts: Number, // 创建时间
})
const starttimeModel = mongoose.model('starttimes', StarttimeSchema)

module.exports = starttimeModel