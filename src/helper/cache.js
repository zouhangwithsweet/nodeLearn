const conf = require('../config')
function refreshRes(stats, res) {
    const {maxAge, expires, cacheControl, lastModified, etag} = conf.cache
    if (expires) {
        res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString())
    }
    if (cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
    }
    if (lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString())
    }
    // if (etag) {
    //     const _et = new Date(stats.mtime).getTime()
    //     res.setHeader('ETag', `${stats.size}-${_et}`)
    // }
}
module.exports = (stats, req, res) => {
    refreshRes(stats, res)
    const lastModified = req.headers['if-modified-since']
    const etag = req.headers['if-none-match']
    if (!lastModified && !etag) {
        return false
    }
    if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false
    }
    if (etag && etag !== res.getHeader('Etage')) {
        return false
    }
    return true
}
