const fs = require('fs')
const path = require('path')

const db = {
    update: {},
    insert: {},
    delete: {},
    search: {},
}

const service_files = fs.readdirSync(path.join(__dirname, './service'))
for (let sfile of service_files) {
    let serv = require(path.join(__dirname, './service', sfile))
    Object.assign(db.update, serv.update)
    Object.assign(db.insert, serv.insert)
    Object.assign(db.delete, serv.delete)
    Object.assign(db.search, serv.search)
}

module.exports = db
// setTimeout(async () => {
//     console.log('update giftconfig')
//     let ret = await db.update.giftConfig('神之笔记本', 65)
//     console.log(ret)
// }, 3000)