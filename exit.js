process.on('exit', code => {
    console.log('about to exit with code' + code)
})

if (typeof window === 'undefined') {
    console.log('node.js')
} else {
    console.log('browser')
}