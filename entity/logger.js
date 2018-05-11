class Logger {

    log(arg) {
        console.log(`\n${new Date().toLocaleString()}------------------`)
        console.log('log: ', JSON.stringify(arg))
    }

    err(arg) {
        console.error(`\n${new Date().toLocaleString()}------------------`)
        console.error('err: ', JSON.stringify(arg, null, 4))
    }
}

module.exports = new Logger()