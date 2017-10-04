const model = require('../model/giftConfigModel.js')
const logger = require('../../entity/logger.js')

exports.update = {
    giftConfig: (name, icon_id) => {
        return new Promise((res, rej) => {
            model.findOne({name}, (err, doc) => {
                if (err) {
                    logger.err(err)
                    res(0)
                }
                else {
                    if (doc) {
                        Object.assign(doc, {icon_id})
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
                    else {
                        model.create({name, icon_id}, (err, doc) => {
                            if (err) {
                                logger.err(err)
                                res(0)
                            }
                            else {
                                res(1)
                            }
                        })
                    }
                }
            })
        })
    }
}

exports.search = {
    giftConfig: (limit={}) => {
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
    }
}

exports.delete = {
    giftConfig: (limit={}) => {
        return new Promise((res, rej) => {
            model.remove(limit, (err) => {
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
