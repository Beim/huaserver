const db = require('../db/db.js')

class Starttime {

    async start(rid) {
        let ret = await db.search.starttime({rid})
        // 若上一条记录没有停止时间，则以当前时间作为停止时间（异常状态）
        if (ret && ret.stop_ts === undefined) {
            await db.update.starttime(ret, {stop_ts: new Date().getTime()})
        }
        await db.insert.starttime({rid, start_ts: new Date().getTime()})

    }

    async stop(rid) {
        let ret = await db.search.starttime({rid})
        // 最近的一条是运行，添加停止
        if (ret && ret.start_ts) {
            await db.update.starttime(ret, {stop_ts: new Date().getTime()})
        }
    }

    async recent_start(rid) {
        let ret = await db.search.starttime({rid})
        return ret === null ? null : ret.start_ts
    }
}

module.exports = new Starttime()
