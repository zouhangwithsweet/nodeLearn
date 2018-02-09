const path = require('path')

const mimeTypes = {
    'css': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'application/javascript;charset=UTF-8',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'swf': 'application/x-shockwave-flash',
    'tiff': 'image/tiff',
    'txt': 'text/plain;charset=UTF-8',
    'wav': 'audio/x-wav',
    'wma': 'audio/x-ms-wma',
    'wmv': 'video/x-ms-wmv',
    'xml': 'text/xml'
}

module.exports = filePath => {
    let ext = path.extname(filePath)
        .split('.')
        .pop()
        .toLocaleLowerCase();
    if (!ext) {
        ext = filePath;
    }
    return mimeTypes[ext] || mimeTypes['txt']
}
