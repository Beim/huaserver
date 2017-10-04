const CONFIG = {
    'env': 'dev', // 默认为开发环境，第一个命令行参数设置(app.js)
    'port': 22000,
    'room_id': 221,
    'def_gift_list': ['辣条', '亿圆', '喵娘', '小电视', 'B坷垃', '自动铅笔', '神之记事本', '666', '233'],
    'idle_time': 1000 * 60 * 60, // 超过闲置时间没有请求则断开socket 服务
    'dev': {
        db: {
            host: 'beiming.life',
            port: '27017',
            db: 'huaserver_dev',
            username: 'user',
            passwd: 'HUAbeim945',
        }
    },
    'pro': {
        db: {
            host: '127.0.0.1',
            port: '27017',
            db: 'huaserver',
            username: 'user',
            passwd: 'HUAbeim945',
        }
    }
}

module.exports = CONFIG