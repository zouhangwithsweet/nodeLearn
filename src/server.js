const http = require('http')
const conf = require('./config')
const path = require('path')
const readF = require('./helper/route')

const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root, req.url)
    readF(req, res, filePath)
})

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`
    console.log(`server is on ${addr}`)
})
