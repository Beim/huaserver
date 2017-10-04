const Koa = require('koa')
const koa_static = require('koa-static')
const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const RoomService = require('../entity/RoomService')
const UpdateGiftConfigService = require('../entity/UpdateGiftConfigService.js')
const CONFIG = require('../conf/global_conf')
CONFIG['env'] = process.argv[2] ? 'pro' : 'dev' // 设置第一个命令行参数则为正式环境，否则为开发环境
const app = new Koa()
const forums = new Router()
const rs = new RoomService() // room service
const udpateGiftConfigService = new UpdateGiftConfigService() // 定时拉取礼物数据

app.use(async (ctx, next) => {
    ctx.room_service = rs
    await next()
})

app.use(async (ctx, next) => {
    await next()
    ctx.set('Access-Control-Allow-Origin', '*')
})

const router_files = fs.readdirSync(path.join(__dirname, '../routes'))
for (let rfile of router_files) {
    let router = require(path.join(__dirname, '../routes', rfile))
    forums.use('/api', router.routes(), router.allowedMethods())
}
app.use(forums.routes())

app.use(koa_static(path.join(__dirname, '../public')))

app.listen(CONFIG['port'])
