const http = require('http')
const fs = require('fs')
const cheerio = require('cheerio')
const path = require('path')
const logger = require('./logger.js')
const db = require('../db/db.js')


const get = (url) => {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            if (res.statusCode !== 200) {
                return resolve(null)
            }
            else {
                res.setEncoding('utf8')
                let rawData = ''
                res.on('data', (c) => {
                    rawData += c
                })
                res.on('end', () => {
                    return resolve(rawData)
                })
            }
        })
    })
}

const update = async () => {
    let rsp = await get('http://api.live.bilibili.com/gift/v2/live/room_gift_list?roomid=53847&area_v2_id=30')
    if (rsp) rsp = JSON.parse(rsp)
    let gifts = []
    if (rsp['msg'] === 'success' && rsp['data'].length > 0) {
        for (let item of rsp.data) {
            gifts.push({
                name: item.name,
                icon_id: parseInt(item.id),
            })
        }
    }
    if (gifts.length > 0) {
        await db.delete.giftConfig()
        for (let item of gifts) {
            await db.update.giftConfig(item.name, item.icon_id)
        }
    }
}

class UpdateGiftService {

    constructor() {
        update()
        setInterval(update, 10 * 60 * 1000)
    }

    get_icon_id() {
        return JSON.parse(fs.readFileSync(GIFT_ICON_DB))
    }
}

module.exports = UpdateGiftService
// new UpdateGiftService()