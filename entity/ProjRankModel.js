class ProjRankModel {
    constructor(name, duration) {
        this.name = name
        this.duration = duration
    }
    toString() {
        return `{name: ${this.name}, duration: ${this.duration}`
    }
}

module.exports = ProjRankModel