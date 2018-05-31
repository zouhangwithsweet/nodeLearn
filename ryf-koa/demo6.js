const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

const about = ctx => {
    ctx.response.type = 'html'
    ctx.response.body = '<a href="/">Index Page</a>'
}

const main = ctx => {
    ctx.response.type = 'html'
    ctx.response.body = '<h2>Hello World</h2>'
}

router.get('/', main)
router.get('/about', about)

app.use(router.routes())

app.listen(3000)
console.log(`server started up on http://localhost:3000`)