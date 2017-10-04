const router = require('koa-router')()
const path = require('path')
const ResMsg = require(path.join(__dirname, '../entity/ResMsg.js'))
const db = require(path.join(__dirname, '../db/db.js'))

router.get('/get', async (ctx, next) => {
    let docs = await db.search.goal({rid: ctx.room_service.rid})
    ctx.body = ResMsg(1, 'success', docs)
    await next()
})


module.exports = router