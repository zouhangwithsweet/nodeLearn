const fs = require('fs')
const path = require('path')
const Hanlebars = require('handlebars')
const conf = require('../config')
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')

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
            const contentType = mime(filePath)
            res.setHeader('Content-Type', contentType)
            if (isFresh(rep, req, res)) {
                res.statusCode = 304
                res.end()
                return
            }
            let rs;
            const {code, start, end} = range(rep.size, req, res)
            if (code === 200) {
                res.statusCode = 200
                rs = fs.createReadStream(filePath)
            } else {
                res.statusCode = 206
                rs = fs.createReadStream(filePath, {start, end})
            }
            if (filePath.match(conf.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res)
        } else if (rep.isDirectory()) {
            let rep = await _dir(filePath)
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            const dir = path.relative(conf.root, filePath)
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
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
