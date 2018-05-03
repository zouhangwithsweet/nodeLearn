const fs = require('fs')
const url = require('url')
const path = require('path')
const http = require('http')

const root = path.resolve(process.argv[2] || '.')

console.log('Staric root dir: ' + root)

const server = http.createServer((request, response) => {
    const pathName = url.parse(request.url).pathname
    const filePath = path.join(root, pathName)
    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            console.log('200' + request.url)
            response.setHeader('Content-Type', 'text/plain;charset=UTF-8')
            response.writeHead(200)
            fs.createReadStream(filePath).pipe(response)
        } else {
            console.log('404' + request.url)
            response.writeHead(404)
            response.end('404 Not Found')
        }
    })
})

server.listen(9527)

console.log('server is running at localhost:9527')