const model = require('../model/displayGiftConfigModel.js')
const logger = require('../../entity/logger.js')
const config = require('../../conf/global_conf.js')

exports.insert = {
    displayGiftConfig: (data) => {
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
    displayGiftConfig: (limit={}) => {
        return new Promise((res, rej) => {
            model.findOne(limit, (err, doc) => {
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
    displayGiftConfig: (data=config.def_display_gift_style) => {
        return new Promise((res, rej) => {
            model.findOne({}, (err, doc) => {
                if (err) { logger.err(err); res(0) }
                else {
                    if (doc) {
                        Object.assign(doc, data)
                        doc.save((err) => {
                            if (err) { logger.err(err); res(0) }
                            else { res(1) }
                        })
                    }
                    else {
                        model.create(data, (err, doc) => {
                            if (err) { logger.err(err); res(0) }
                            else { res(1) }
                        })
                    }
                }
            })
        })
    }
}