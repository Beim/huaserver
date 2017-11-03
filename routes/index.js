const router = require('koa-router')()
const path = require('path')
const ResMsg = require(path.join(__dirname, '../entity/ResMsg.js'))
const db = require(path.join(__dirname, '../db/db.js'))
const bilibiliApiHelper = require('../entity/bilibiliApiHelper.js')

router.get('/get', async (ctx, next) => {
    let docs = await db.search.goal({rid: ctx.room_service.rid})
    ctx.body = ResMsg(1, 'success', docs)
    await next()
})

router.get('/get/guard/221', async (ctx, next) => {
    let rsp = await bilibiliApiHelper.getGuard_211()
    if (!rsp) {
        return ctx.body = ResMsg(0, 'success')
    }
    rsp = JSON.parse(rsp)
    if (rsp.msg !== 'ok') {
        return ctx.body = ResMsg(0, 'success')
    }
    ctx.body = ResMsg(1, 'success', rsp.data)
    await next()
})


module.exports = router