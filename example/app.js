let express = require('express')
let superagent = require('superagent')
let cheerio = require('cheerio')
let eventproxy = require('eventproxy')
let url = require('url')
let cnodeUrl = 'https://cnodejs.org/'
let ep = new eventproxy()
let app = express()
let page = require('./homePage.html')
app.get('/', (req, res) => {
    res.send(page)
})

app.get('/home', (req, res, next) => {
    superagent.get('https://cnodejs.org/')
    .end((err, sres) => {
        if (err) return next(err)
        let $ = cheerio.load(sres.text)
        let items = []
        let topicUrls = []
        $('#topic_list .topic_title').each((index, element) => {
            let $element = $(element)
            let href = url.resolve(cnodeUrl, $element.attr('href'))
            topicUrls.push(href)
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            })
        })
        // console.log(topicUrls)
        ep.after('topic_html', topicUrls.length, topics => {
            topics = topics.map(topicPair => {
                let topicUrl = topicPair[0]
                let topicHtml = topicPair[1];
                let $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                });
            })
            console.log('final:')
            console.log(topics)
        })
        topicUrls.forEach(topicUrl => {
            superagent.get(topicUrl)
            .end((err, res) => {
                console.log(`fetch ${topicUrl} successful`)
                ep.emit('topic_html', [topicUrl, res.text])
            })
        })
        res.send(items)
    })
})

app.listen(3030, () => {
    console.log('app is listening at port 3000')
})
