const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const app = new Koa()

const files = fs.readdirSync(__dirname + '/controllers')
const js_files = files.filter(f => {
    return f.endsWith('.js')
})

for (let f of js_files) {
    console.log(`Process controller: ${f}...`)
    // 导入js文件:
    let mapping = require(__dirname + '/controllers/' + f);
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}



app.use(bodyParser())

// add router middleware
app.use(router.routes())

app.listen(9527)
console.log('server start up')