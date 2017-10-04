const path = require('path')
const mongoose = require('mongoose')

const CONFIG = require(path.join(__dirname, '../conf/global_conf.js'))
const DB_CONF = CONFIG[CONFIG['env']].db
const logger = require(path.join(__dirname, '../entity/logger.js'))

const db = mongoose.connect(`mongodb://${DB_CONF['username']}:${DB_CONF['passwd']}@${DB_CONF['host']}:${DB_CONF['port']}/${DB_CONF['db']}`)

db.connection.on("error",function(error){
    logger.log("connection error : " + error)
});
db.connection.on("open",function(){
    logger.log("------- 数据库连接成功！-------")
});

module.exports = mongoose