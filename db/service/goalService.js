const model = require('../model/goalModel.js')
const logger = require('../../entity/logger.js')

exports.update = {
    // 根据rid 和gift_name 来确定唯一的记录，若不存在则新建
    goal: (rid, gift_name, data) => {
        return new Promise((res, rej) => {
            model.findOne({rid, gift_name}, (err, doc) => {
                if (err) { logger.err(err); res(0); }
                else {
                    if (doc) {
                        Object.assign(doc, data)
                        doc.save((err) => {
                            if (err) { logger.err(err); res(0); }
                            else { res(1); }
                        })
                    }
                    else {
                        model.create(Object.assign({rid, gift_name}, data), (err, doc) => {
                            if (err) { logger.err(err); res(0); }
                            else { res(1); }
                        })
                    }
                }
            })
        })
    },

    goals: (conditions, update) => {
        return new Promise((res, rej) => {
            model.update(conditions, update, {multi: true}, (err, doc) => {
                if (err) { logger.err(err); res(0); }
                else { res(1); }
            })
        })
    },

    add_goal: (rid, gift_name, num=1) => {
        return new Promise((res, rej) => {
            model.findOne({rid, gift_name}, (err, doc) => {
                if (err) { logger.err(err); res(0); }
                else {
                    if (doc) {
                        doc.count += parseInt(num)
                        doc.save((err) => {
                            if (err) { logger.err(err); res(0); }
                            else res(1)
                        })
                    }
                    else { res(-1); }
                }
            })
        })
    }
}

// exports.insert = {
//     goal: (data) => {
//         return new Promise((res, rej) => {
//             model.create(data, (err, doc) => {
//                 if (err) { logger.err(err); res(0); }
//                 else {
//                     res(1)
//                 }
//             })
//         })
//     }
// }

exports.search = {
    goal: (limit) => {
        return new Promise((res, rej) => {
            model.find(limit, (err, docs) => {
                if (err) { logger.err(err); res(0); }
                else {
                    res(docs)
                }
            })
        })
    },

}

exports.delete = {
    goal: (limit={}) => {
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
