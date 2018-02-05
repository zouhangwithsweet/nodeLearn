const fs = require('fs')
const path = require('path')
const Hanlebars = require('handlebars')
const conf = require('../config')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Hanlebars.compile(source.toString())

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
async function readF(req, res, filePath) {
    try {
        const rep = await _r(filePath)
        if (rep.isFile()) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            fs.createReadStream(filePath).pipe(res)
        } else if (rep.isDirectory()) {
            let rep = await _dir(filePath)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            const data = {
                title: path.basename(filePath),
                dir: path.relative(conf.root, filePath),
                files: rep
            }
            res.end(template(data))
        }
    } catch(e) {
        console.error(e)
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${filePath} is not a directory or file!`)
    }
}

module.exports = readF
