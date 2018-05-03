'use strict'

const fs = require('fs')

fs.readFile('./exit.js', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})

// async await

const read = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

const readFile = async path => {
    let resp = await read(path)
    console.log(resp)
    console.log('支持async、await')
}

readFile('./fs.js')


// 写文件
let data = 'hello, node.js'
fs.writeFile('./outpu.text', data, err =>{
    if (err) {
        console.log(err)
    } else {
        console.log('ok')
    }
})

fs.stat
