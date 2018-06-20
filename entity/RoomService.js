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
                data = this._parse_gift_data(data) // 注意这里msg的数据也会被修改
                await db.insert.gift(data)
                await db.update.add_goal_atomic(this.rid, msg.gift.name, msg.gift.count)
                logger.log(`RoomService: 礼物【${msg.gift.id}】【${msg.gift.name}】 【${msg.gift.count}】个 by 【${msg.user.name}】`)
            }
            else if (msg.type === 'comment') {
                let data = Object.assign({rid: this.rid}, msg)
                await db.insert.comment(data)
            }
        })
        rs.on('danmaku.connect', () => {
            this._disconnected()
            logger.log('RoomService: 正在连接')
        })
        rs.on('danmaku.connected', () => {
            this._connected()
            logger.log('RoomService: 已经连接')
        })
        rs.on('danmaku.close', () => {
            this._disconnected()
            logger.log('RoomService: 关闭连接')
        })
        rs.on('danmaku.error', () => {
            this._disconnected()
            logger.log('RoomService: 发生错误')
        })
        
    }

    // 处理一下个别礼物的名字问题 
    _parse_gift_data(data) {
        // 小电视名字变更为小电视飞船 # 2018.5.12 b站送小电视时礼物名是小电视飞船，但是抓全部礼物时名字还是小电视，这里需要修改插入数据的礼物名
        // if (data.gift.name === '小电视飞船') {
        //     logger.log('【小电视飞船】 改为【小电视】')
        //     data.gift.name = '小电视'
        // }
        // 外显小电视飞船，api显示小电视
        if (data.gift.name.match('小电视')) {
            logger.log(`【${data.gift.name}】 改为 【小电视飞船】`)
            data.gift.name = '小电视飞船'
        }
        return data
    }

    _connected() {
        this.status = 1
    }

    _disconnected() {
        this.status = 0
    }

}

module.exports = RoomService