const Koa = require('koa')
const app = new Koa()

const main = ctx => {
    if (ctx.request.path !== '/') {
        ctx.response.type= 'html'
        ctx.response.body = `<a href="/">Index Page</a>`
    } else {
        ctx.response.body = 'Hello World'
    }
}

app.use(main)
app.listen(3000)
console.log(`server started up on http://localhost:3000`)

