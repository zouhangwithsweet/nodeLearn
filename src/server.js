const http = require('http')
const conf = require('./config')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root, req.url)
    const _r = path => {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
    const _dir = path => {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
    async function readF() {
        const rep = await _r(filePath)
        if (rep.isFile()) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            fs.createReadStream(filePath).pipe(res)
        } else if (rep.isDirectory()) {
            let rep = await _dir(filePath)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            res.end(rep.join(','))
        }
    }
    readF()
})

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`
    console.log(`server is on ${addr}`)
})
