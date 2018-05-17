const Koa = require('koa')
const app = new Koa()

const main = ctx => {
    ctx.response.body = 'Hello World'
}

app.use(main)
app.listen(3000)
console.log(`server started up on http://localhost:3000`)