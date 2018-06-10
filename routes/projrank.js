const router = require('koa-router')()
const path = require('path')
const ResMsg = require(path.join(__dirname, '../entity/ResMsg.js'))
const db = require(path.join(__dirname, '../db/db.js'))
const projRankManager = require(path.join(__dirname, '../entity/projRankManager.js'))
const ProjRankModel = require(path.join(__dirname, '../entity/ProjRankModel.js'))

router.get('/get/projs', async (ctx, next) => {
    ctx.body = ResMsg(1, 'success', projRankManager.get())
    await next()
})

router.get('/get/projServiceStatus', async (ctx, next) => {
    ctx.body = ResMsg(1, '', projRankManager.onplay())
    await next()
})

// /api/set/proj?name=?&&duration=?
router.get('/set/proj', async (ctx, next) => {
    const {name, duration} = ctx.query
    let ret = projRankManager.insert(new ProjRankModel(name, duration))
    ctx.body = ResMsg(ret, '')
    await next()
})

// /api/start/projrank
router.get('/start/projrank', async (ctx, next) => {
    ctx.body = ResMsg(projRankManager.start(), '')
    await next()
})

router.get('/stop/projrank', async (ctx, next) => {
    ctx.body = ResMsg(projRankManager.stop(), '')
    await next()
})

// /api/set/proj/priority?idx=?&&priority=?
router.get('/set/proj/priority', async (ctx, next) => {
    const {idx, priority} = ctx.query
    let ret = projRankManager.adjustPos(parseInt(idx), parseInt(priority))
    ctx.body = ResMsg(ret, '')
    await next()
})

// /api/set/proj/duration?idx=?&&duration=?
router.get('/set/proj/duration', async (ctx, next) => {
    const {idx, duration} = ctx.query
    let ret = projRankManager.setDuration(parseInt(idx), parseInt(duration))
    ctx.body = ResMsg(ret, '')
    await next()
})




module.exports = router