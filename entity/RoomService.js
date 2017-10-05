const { Room } = require('bilibili-live')
const CONFIG = require('../conf/global_conf.js')
const logger = require('./logger.js')
const db = require('../db/db.js')

class RoomService {

    /*
        config = {
            rid: 92052 // 直播间id
        }
    */
    constructor() {
        this.rs = null
        this.rid = CONFIG['room_id']
        this._disconnected()
    }

    init_room(config) {
        this.rs = new Room({url: config.rid})
        this.rid = config.rid
        this._disconnected()
        this._set_rs_handler()
        
    }

    is_connected() {
        return this.status === 1
    }

    connect() {
        this.rs.connect()
        this._connected()
    }

    disconnect() {
        this.rs.disconnect()
        this._disconnected()
    }
    
    // 设置rs(room service) 的handler
    _set_rs_handler() {
        let rs = this.rs
        rs.on('danmaku.message', async (msg) => {
            this._connected()
            if (msg.type === 'online') {
                let data = Object.assign({rid: this.rid}, msg)
                await db.insert.onlineMsg(data)
            }
            else if (msg.type === 'gift') {
                let data = Object.assign({rid: this.rid}, msg)
                await db.insert.gift(data)
                // await db.update.add_goal(this.rid, msg.gift.name, msg.gift.count)
                await db.update.add_goal_atomic(this.rid, msg.gift.name, msg.gift.count)
                console.log(`增加礼物【${msg.gift.name}】 【${msg.gift.count}】个`)
            }
            else if (msg.type === 'comment') {
                let data = Object.assign({rid: this.rid}, msg)
                await db.insert.comment(data)
            }
        })
        rs.on('danmaku.connect', () => {
            this._disconnected()
            logger.log('正在连接')
        })
        rs.on('danmaku.connected', () => {
            this._connected()
            logger.log('已经连接')
        })
        rs.on('danmaku.close', () => {
            this._disconnected()
            logger.log('关闭连接')
        })
        rs.on('danmaku.error', () => {
            this._disconnected()
            logger.log('发生错误')
        })
        
    }

    _connected() {
        this.status = 1
    }

    _disconnected() {
        this.status = 0
    }

}

module.exports = RoomService