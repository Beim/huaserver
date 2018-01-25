const router = require('koa-router')()
const path = require('path')
const ResMsg = require(path.join(__dirname, '../entity/ResMsg.js'))
const starttime = require(path.join(__dirname, '../entity/starttime.js'))
const db = require(path.join(__dirname, '../db/db.js'))
const config = require('../conf/global_conf.js')

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

router.get('/get/displaygiftconfig', async (ctx, next) => {
    let displayGiftConfig = await db.search.displayGiftConfig()
    if (displayGiftConfig) {
        ctx.body = ResMsg(1, 'success', displayGiftConfig)
    }
    else {
        ctx.body = ResMsg(1, 'success', config.def_display_gift_style)
    }
    await next()
})

// /api/set/displaygiftconfig?fontColor=?&&textShadowColor=?
router.get('/set/displaygiftconfig', async (ctx, next) => {
    let {fontColor, textShadowColor} = ctx.query
    let ret = await db.update.displayGiftConfig({fontColor, textShadowColor})
    ctx.body = ResMsg(ret)
    await next()
})


module.exports = router