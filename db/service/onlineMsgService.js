const model = require('../model/onlineMsgModel.js')
const logger = require('../../entity/logger.js')

exports.insert = {
    onlineMsg: (data) => {
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