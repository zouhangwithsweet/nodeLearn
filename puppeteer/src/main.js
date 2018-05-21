const puppeteer = require('puppeteer')
const images = require('./config/index')
const srcToimg = require('./helper/srcToimg')

;(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://image.baidu.com')
    console.log('打开')
    await page.setViewport({
        width: 1920,
        height: 1080
    })
    console.log('设置窗口大小')
    await page.type('#kw', '猫', {delay: 0})
    await page.keyboard.press('Enter')
    // await page.click('.s_btn')
    console.log('输入')
    page.on('load',async () => {
        console.log('图片出来了')

        const srcs = await page.evaluate(() => {
            const images = document.querySelectorAll('img.main_img')
            return Array.prototype.map.call(images, img => img.src)
        })

        srcs.forEach(async src => {
            await srcToimg(src, images.screenshot)
        })

        await browser.close()
    })
})()