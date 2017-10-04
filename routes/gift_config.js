const router = require('koa-router')()
const path = require('path')
const ResMsg = require(path.join(__dirname, '../entity/ResMsg.js'))
const starttime = require(path.join(__dirname, '../entity/starttime.js'))
const db = require(path.join(__dirname, '../db/db.js'))

router.get('/get/giftconfig', async (ctx, next) => {
    let giftConfig = await db.search.giftConfig()
    if (giftConfig) {
        ctx.body = ResMsg(1, 'success', giftConfig)
    }
    else {
        ctx.body = ResMsg(0, 'gift config fetch failed')
    }
    await next()
})


module.exports = router