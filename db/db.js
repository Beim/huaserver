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
//     // let ret = await db.update.giftConfig('神之笔记本', 65)
//     let ret
//     ret = await db.insert.proj({'name': 1, duration: 5})
//     ret = await db.insert.proj({'name': 2, duration: 5})
//     ret = await db.insert.proj({'name': 3, duration: 5})
//     // ret = await db.insert.proj({'name': 4, duration: 10})
//     // ret = await db.insert.proj({'name': 5, duration: 10})
//     // ret = await db.insert.proj({'name': 10, duration: 100})
//     // ret = await db.update.decFirstDuration()
//     // ret = await db.update.projPriorityById('5b1cfb25bcc72b34cca6e13a', 5)
//     // ret = await db.search.projs()
//     // let ret = await db.search.projById('5b1cf01b77861f13c0d897c7')
//     console.log(ret)
// }, 3000)