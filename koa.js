const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const controller = require('./controller')
const app = new Koa()


app.use(bodyParser())

// add router middleware
app.use(controller())

app.listen(9527)
console.log('server start up')