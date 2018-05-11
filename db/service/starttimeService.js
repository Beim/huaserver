const model = require('../model/starttimeModel.js')
const logger = require('../../entity/logger.js')

exports.insert = {
    starttime: (data) => {
        data.ts = new Date().getTime()
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
    // 找到最近的一条信息
    starttime: (limit) => {
        return new Promise((res, rej) => {
                model.findOne(limit, null, {sort: {ts: -1}}, (err, doc) => {
                    if (err) {
                        logger.err(err)
                        res(0)
                    }
                    else {
                        res(doc)
                    }
                })
        })
    }
}
exports.update = {
    starttime: (limit, data) => {
        return new Promise((res, rej) => {
            model.findOne(limit, (err, doc) => {
                if (err) {
                    logger.err(err)
                    res(0)
                }
                else {
                    Object.assign(doc, data)
                    console.log('on update')
                    console.log(data)
                    logger.log(`on update ${JSON.stringify(data)}`)
                    doc.save((err) => {
                        if (err) {
                            logger.err(err)
                            res(0)
                        }
                        else {
                            res(1)
                        }
                    })
                }
            })
        })
    }
}