const mongoose = require('../mongoose.js')

const GoalSchema = new mongoose.Schema({
    rid: {type: Number, required: true},
    gift_name: {type: String, required: true}, // 礼物名
    count: {type: Number, default: 0}, // 礼物已累计数量
    step: {type: Number, required: true}, // 单次达成目标
    goal: {type: Number, required: true}, // 总目标数
    reward: {type: String, required: true},
})
const goalModel = mongoose.model('goals', GoalSchema)

module.exports = goalModel