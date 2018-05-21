const puppeteer = require('puppeteer');
const images = require('./config/index');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://baidu.com');
        await page.screenshot({ path: `${images.screenshot}/example.png` });

    await browser.close();
})();