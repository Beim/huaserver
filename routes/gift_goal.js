const router = require('koa-router')()
const path = require('path')
const ResMsg = require(path.join(__dirname, '../entity/ResMsg.js'))
const db = require(path.join(__dirname, '../db/db.js'))

// /api/achieve/goal/[自动铅笔]/221
router.get('/achieve/goal/:gift_name/:room_id', async (ctx, next) => {
    let docs = await db.search.goal({
        gift_name: ctx.params.gift_name,
        rid: ctx.params.room_id,
    })
    if (docs !== 0 && docs.length > 0) {
        doc = docs[0]
        doc.goal += doc.step
        let ret = await new Promise((res, rej) => {
            doc.save((err) => {
                if (err) res(0)
                else res(1)
            })
        })
        ctx.body = ResMsg(ret, '')
    }
    else {
        ctx.body = ResMsg(0, 'search failed')
    }
    await next()
})

// /api/new/goal/[自动铅笔]/221?step_num=[1000]&&reward=心跳
router.get('/new/goal/:gift_name/:room_id', async (ctx, next) => {
    let record = { 
        rid: parseInt(ctx.params.room_id),
        gift_name: ctx.params.gift_name,
        step: parseInt(ctx.query.step_num),
        goal: parseInt(ctx.query.step_num),
        reward: ctx.query.reward,
        count: 0,
    }
    let ret = await db.update.goal(parseInt(ctx.params.room_id), ctx.params.gift_name, record)
    if (ret !== 0) {
        ctx.body = ResMsg(1, 'success')
    }
    else {
        ctx.body = ResMsg(0, 'new goal failed')
    }
    await next()
})

// /api/del/goal/[自动铅笔]/221
router.get('/del/goal/:gift_name/:room_id', async (ctx, next) => {
    let limit = {
        gift_name: ctx.params.gift_name,
        rid: parseInt(ctx.params.room_id),
    }
    let ret = await db.delete.goal(limit)
    if (ret !== 0) {
        ctx.body = ResMsg(1, 'success')
    }
    else {
        ctx.body = ResMsg(0, 'delete failed')
    }
    await next()
})

// /api/clear/count/221  清空该房间对应的所有礼物统计
router.get('/clear/count/:room_id', async (ctx, next) => {
    let conditions = {rid: parseInt(ctx.params.room_id)}
    let update = {count: 0}
    let ret = await db.update.goals(conditions, update)
    ctx.body = ResMsg(ret, '')
    await next()
})

// /api/set/count/:gift_name/:room_id?num=[1000]
router.get('/set/count/:gift_name/:room_id', async (ctx, next) => {
    let { gift_name, room_id } = ctx.params
    let count = ctx.query.num
    let ret = await db.update.goal(parseInt(room_id), gift_name, {count})
    ctx.body = ResMsg(ret, '')
    await next()
})

// /api/set/reward/:gift_name/:room_id?reward=[喝水]
router.get('/set/reward/:gift_name/:room_id', async (ctx, next) => {
    let { gift_name, room_id } = ctx.params
    let reward = ctx.query.reward
    let ret = await db.update.goal(parseInt(room_id), gift_name, {reward})
    ctx.body = ResMsg(ret, '')
    await next()
})

module.exports = router