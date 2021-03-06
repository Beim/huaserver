const model = require('../model/commentModel.js')
const logger = require('../../entity/logger.js')

exports.insert = {
    comment: (data) => {
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