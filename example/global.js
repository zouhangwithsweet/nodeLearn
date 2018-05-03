/**
 * nodejs 全局对象 global
 * commonJS
 * buffer，process，console
 * timer(setTimeout,setInterval,setImmediate)
 */
 
const testVar = 1000
global.testVar1 = 2000
moudule.exports.testVar = 1000

/**
 * path normalize join
 */

const {normalize, join}  = require('path')

console.log(join('/user'))