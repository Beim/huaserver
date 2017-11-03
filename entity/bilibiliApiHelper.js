const http = require('http')

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

module.exports = {
    // 获取礼物列表
    getGiftList: async () => {
        return await get('http://api.live.bilibili.com/gift/v2/live/room_gift_list?roomid=53847&area_v2_id=30')
    },

    // 获取巫春天的直播间的舰队列表
    getGuard_211: async () => {
        return await get('http://api.live.bilibili.com/guard/topList?roomid=53847')
    },
}