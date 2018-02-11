module.exports = {
    root: process.cwd(),
    hostname: '127.0.0.1',
    port: '9527',
    compress: /\.(tpl|html|css|md|js|json)/,
    cache: {
        maxAge: 600,
        cacheControl: true,
        expires: true,
        lastModified: true,
        etag: true
    }
}
