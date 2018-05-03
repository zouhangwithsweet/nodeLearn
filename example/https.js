const http = require('http')
const homePage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Node部署实例</title>
</head>
<body>
    <h1>hello world</h1>
    <ul>
        <li>
            <a href="/a" target="_blank">666</a>
        </li>
    </ul>
</body>
</html>
`
http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(homePage)
})
.listen(3000, () => {
    console.log('done')
})