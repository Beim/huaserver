// router.get('/stop', async (ctx, next) => {
//     if (ctx.room_service.is_connected()) {
//         ctx.room_service.disconnect()
//         await starttime.stop(parseInt(ctx.room_service.rid))
//         ctx.body = ResMsg(1, 'success')
//     }
//     else {
//         ctx.body = ResMsg(2, 'already stopped')
//     }
//     await next()
// })
const starttime = require('./starttime.js')

const stopTime = 2 * 60 * 60 * 1000
const checkTime = 15 * 60 * 1000

let time0 = new Date().getTime()
let checkInterval = null

const stopService = async (ctx) => {
    if (ctx.room_service.is_connected()) {
        ctx.room_service.disconnect()
        await starttime.stop(parseInt(ctx.room_service.rid))
    }
}

const setCheckInterval = (ctx) => {
    checkInterval = setInterval(() => {
        let time1 = new Date().getTime()
        if (time1 - time0 > stopTime) {
            stopService(ctx)
        }
    }, checkTime)
}

const autoStopService = async (ctx, next) => {
    if (checkInterval === null) setCheckInterval(ctx)
    time0 = new Date().getTime()
    await next()
}

module.exports = autoStopService