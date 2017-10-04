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
    try {
        const html = await get('http://live.bilibili.com/221')
        const $ = cheerio.load(html)
        let gift_items = $('.gift-item')
        let gifts = []
        for (let i = 0; i < gift_items.length; i++) {
            let gift = $(gift_items[i]).attr('data-title')
            if (gift) {
                gifts.push({
                    name: gift,
                    icon_id: parseInt($(gift_items[i]).attr('data-gift-id'))
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
    catch (e) {
        logger.err('updateGiftConfigService')
        logger.err(e)
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