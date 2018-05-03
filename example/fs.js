const fs = require('fs');

// fs.readFile('./koa.js', (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data.toString())
//     }
// })

// const content = Buffer.from('this is a test')

// fs.writeFile('./text.js', content, err => {
//     if (err) console.log(err)
//     console.log('写好了')
// })

fs.stat('./fs.js', (err, stats) => {
    if (err) throw err
    console.log('====================================');
    console.log(stats.isDirectory());
    console.log('====================================');
})