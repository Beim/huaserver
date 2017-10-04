const router = require('koa-router')()
const path = require('path')
const ResMsg = require(path.join(__dirname, '../entity/ResMsg.js'))
const starttime = require(path.join(__dirname, '../entity/starttime.js'))
const db = require(path.join(__dirname, '../db/db.js'))

// 获取room_service 的运行状态
router.get('/get/state', async (ctx, next) => {
    ctx.body = ResMsg(1, 'success', ctx.room_service.is_connected())
    await next()
})

// 初始化room_service，返回设置的rid，若room_service 已经连接，返回原来设置的rid
router.get('/initroom/:room_id', async (ctx, next) => {
    let rid = parseInt(ctx.params.room_id)
    if (!ctx.room_service.is_connected()) {
        ctx.room_service.init_room({rid})
        ctx.body = ResMsg(1, 'success', {rid})
    }
    else {
        ctx.body = ResMsg(2, 'already exist', {rid: ctx.room_service.rid})
    }
    await next()
})

router.get('/start', async (ctx, next) => {
    if (ctx.room_service.rs === null) {
        ctx.body = ResMsg(0, 'need to init room')
    }
    else if (!ctx.room_service.is_connected()) {
        ctx.room_service.connect()
        await starttime.start(parseInt(ctx.room_service.rid))
        ctx.body = ResMsg(1, 'success')
    }
    else {
        ctx.body = ResMsg(2, 'alrady started')
    }
    await next()
})

router.get('/stop', async (ctx, next) => {
    if (ctx.room_service.is_connected()) {
        ctx.room_service.disconnect()
        await starttime.stop(parseInt(ctx.room_service.rid))
        ctx.body = ResMsg(1, 'success')
    }
    else {
        ctx.body = ResMsg(2, 'already stopped')
    }
    await next()
})





module.exports = router