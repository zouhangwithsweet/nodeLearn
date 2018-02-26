const http = require('http')
const conf = require('./config')
const path = require('path')
const readF = require('./helper/route')

class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config)
    }

    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url)
            readF(req, res, filePath, this.conf)
        })
        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`
            console.log(`server is on ${addr}`)
        })
    }
}

module.exports = Server
