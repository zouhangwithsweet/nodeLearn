const EventEmitter = require('events')

class CustomEvent extends EventEmitter {

}

const ce = new CustomEvent()

ce.on('error', (err) => {
    console.log(err)
})

ce.emit('error', new Error('opps!'))

function fn1() {
    console.log('fn1')
}

function fn2() {
    console.log('fn2')
}

const ne = new CustomEvent()

ce.on('test', fn1)
ce.on('test', fn2)

setTimeout(() => {
    ce.removeListener('test', fn2)
})