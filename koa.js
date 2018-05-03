const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
})

// add url-route
router.get('/hello/:name', async(ctx, next) => {
    const name = ctx.params.name
    ctx.response.body = `<h1>hello, ${name}</h1>`
})

router.get('/', async (ctx, next) => {
    ctx.response.body=`<h1>Index page</h1>
        <form action="/signin" method="post">
            <p>Name: <input type="text" name="name" value="koa"/></p>
            <p>Password: <input type="password" name="password"/></p>
            <p><input type="submit" value="Submit"/></p>
        </form>
    `
})

router.post('/signin', async (ctx, next) => {
    const name = ctx.request.body.name || ''
    const password = ctx.request.body.password || ''
    console.log(`Signin with name: ${name}, password: ${password}`)

    if (name === 'koa' && password ==='12345') {
        ctx.response.body = `<h1>welcome, ${name}</h1>`
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
            <p><a href="/">Try again</a></p>
        `
    }
})

app.use(bodyParser())

// add router middleware
app.use(router.routes())

app.listen(9527)
console.log('server start up')