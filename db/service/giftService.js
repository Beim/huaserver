const model = require('../model/giftModel.js')
const logger = require('../../entity/logger.js')

exports.insert = {
    gift: (data) => {
        return new Promise((res, rej) => {
            model.create(data, (err, doc) => {
                if (err) {
                    logger.err(err)
                    res(0)
                }
                else {
                    res(1)
                }
            })
        })
    }
}

exports.search = {
    gift: (limit) => {
        return new Promise((res, rej) => {
            model.find(limit, (err, docs) => {
                if (err) {
                    logger.err(err)
                    res(0)
                }
                else {
                    res(docs)
                }
            })
        })
    },

    gift_after: (limit, ts) => {
        return new Promise((res, rej) => {
            let query = model.find(limit)
            query.where('ts').gte(ts)
            query.exec((err, docs) => {
                if (err) {
                    logger.err(err)
                    res(0)
                }
                else {
                    res(docs)
                }
            })
        })
    }
}