const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
        width: 1920,
        height: 1080,
        
    },
    executablePath: '/usr/bin/google-chrome-stable',
  });
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page);
  await recorder.start('./out/video/simple.mp4'); // supports extension - mp4, avi, webm and mov
  //await page.goto('https://bing.com');

  await page.goto('https://www.binance.com/en/trade/BTC_USDT?layout=pro');

  console.log("recording");
  setTimeout(async () => {
    await recorder.stop();
    await browser.close();
    console.log("finished");
}, 1000 * 15);

})();