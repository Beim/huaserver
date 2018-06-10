const path = require('path')
const logger = require(path.join(__dirname, './logger.js'))
const ProjRankModel = require('./ProjRankModel.js')

class ProjRankManager {
    constructor() {
        this.onlist = []
        this.offlist = []
        this.timer = null
    }

    onplay() {
        return this.timer !== null
    }

    get() {
        return {
            onlist: this.onlist,
            offlist: this.offlist,
            onplay: this.onplay(),
        }
    }

    runFunc() {
        // 只保留100个
        if (this.offlist.length > 100) {
            this.offlist.splice(0, this.offlist.length - 100)
        }
        if (this.onlist.length === 0) {
            logger.log('onlist.length === 0, stop timer')
            return this.stop()
        }
        else {
            let currProj = this.onlist[0]
            if (currProj.duration === 0) {
                this.onlist.splice(0, 1)
                this.offlist.push(currProj)
            }
            else {
                this.decDuration()
            }
        }
    }

    start() {
        if (this.onplay()) return 0
        this.timer = setInterval(this.runFunc.bind(this), 1000)
        logger.log('start projRankService')
        return 1
    }

    stop() {
        clearInterval(this.timer)
        this.timer = null
        logger.log('stop projRankService')
        return 1
    }

    insert(projRank) {
        this.onlist.push(projRank)
        return 1
    }

    // 调整位置
    adjustPos(curr, next) {
        if (curr === next) return 1
        if (curr < 0 || curr >= this.onlist.length || next < 0 || next >= this.onlist.length) {
            logger.err(`adjustPos(${curr}, ${next}) param illegal`)
            return 0
        }
        let s0 = this.onlist.splice(curr, 1)
        this.onlist.splice(next, 0, s0[0])
        return 1
    }

    // 修改时间
    setDuration(pos, duration) {
        pos = parseInt(pos)
        this.onlist[pos].duration = duration
        return 1
    }

    decDuration() {
        let firstProj = this.onlist[0]
        if (firstProj.duration > 0) {
            firstProj.duration -= 1
        }
        return 1
    }
}

projRankManager = new ProjRankManager()
// projRankManager.insert(new ProjRankModel('1', 5))
// projRankManager.insert(new ProjRankModel('2', 5))
// projRankManager.insert(new ProjRankModel('3', 5))
// projRankManager.insert(new ProjRankModel('4', 5))
//
// projRankManager.start()


module.exports = projRankManager