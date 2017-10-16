const router = require('koa-router')()
const path = require('path')
const ResMsg = require(path.join(__dirname, '../entity/ResMsg.js'))
const db = require(path.join(__dirname, '../db/db.js'))

// /api/get/giftdata/raw?ts0=[]&&ts1=[]
router.get('/get/giftdata/raw', async (ctx, next) => {
    const limit = {
        'ts': {
            '$gte': parseInt(ctx.query.ts0),
            '$lte': parseInt(ctx.query.ts1),
        }
    }
    const ret = await db.search.gift(limit)
    if (ret === 0) {
        ctx.body = ResMsg(0, 'failed')
    }
    else {
        ctx.body = ResMsg(1, 'success', ret)
    }
    await next()
})

router.get('/get/giftdata', async (ctx, next) => {
    const limit = {
        'ts': {
            '$gte': parseInt(ctx.query.ts0),
            '$lte': parseInt(ctx.query.ts1),
        }
    }
    const ret = await db.search.gift(limit)
    if (ret === 0) {
        ctx.body = ResMsg(0, 'failed')
    }
    else {
        const giftDateByCharge = {}
        ret.map((val) => {
            const gift = val.gift
            // 获取所有礼物
            if (giftDateByCharge[gift.name]) {
                giftDateByCharge[gift.name]['count'] += parseInt(gift.count)
                giftDateByCharge[gift.name]['price'] += parseInt(gift.count) * parseInt(gift.price)
            }
            else {
                giftDateByCharge[gift.name] = {
                    count: parseInt(gift.count),
                    price: parseInt(gift.count) * parseInt(gift.price),
                    unitPrice: parseInt(gift.price),
                    type: gift.type,
                }
            }
        })
        ctx.body = ResMsg(1, 'success', giftDateByCharge)
    }
    await next()
})


module.exports = router