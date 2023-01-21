const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
  });
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page);
  await recorder.start('./report/video/simple.mp4'); // supports extension - mp4, avi, webm and mov
  await page.goto('https://bing.com');

  await page.goto('https://google.com');
  await recorder.stop();
  await browser.close();
})();