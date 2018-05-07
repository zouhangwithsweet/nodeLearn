const fs = require('fs')

function addMapping(router, mapping) {
    for (let url in mapping) {
        // 此处的mapping 为一个对象，key为路径，mapping[key]为回调函数
        if (url.startsWith('GET ')) {
            let path = url.substring(4)
            router.get(path, mapping[url])
        }
    }
}

function addControllers(router) {
    let files = fs.readdirSync(__dirname + '/controllers')
    let js_files = files.filter(f => {
        return f.endsWith('.js')
    })
    console.log(js_files)
    for (let f of js_files) {
        console.log(`process controller:${f}...`)
        let mapping = require(__dirname + '/controllers/' + f)
        addMapping(router, mapping)
    }
}

module.exports = function(dir) {
    let controllers_dir = dir || 'controllers' // 如果不传参数，扫描目录默认为'controllers'
    let router = require('koa-router')()
    addControllers(router, controllers_dir)
    return router.routes()
}