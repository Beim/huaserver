class Logger {

    log(arg) {
        console.log('log: ', JSON.stringify(arg))
    }

    err(arg) {
        console.error('err: ', JSON.stringify(arg, null, 4))
    }
}

module.exports = new Logger()