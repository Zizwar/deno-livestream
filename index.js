const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    executablePath: "/usr/bin/google-chrome-stable",
  });
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page);

  console.log("recording");
  await recorder.start("./out/video/simple.mp4"); // supports extension - mp4, avi, webm and mov
  //await page.goto('https://bing.com');

  await page.goto("https://www.binance.com/en/trade/BTC_USDT?layout=pro");

  //#onetrust-accept-btn-handler     accept cookies
  //.css-4rbxuz  skip help
  //.css-1sh2brw skip help

  //.css-1pj8e72  line
  //.css-1pj8e72   1s
  //.css-1rgzdx   chart tridingview
  //.css-lzd0h4   chart binance
  await page.waitFor(2000);
  await page.click("#onetrust-accept-btn-handler");
  console.log("accept cookies");

  await page.waitFor(100);
  await page.click(".css-4rbxuz");
  await page.waitFor(200);
  await page.click(".css-1sh2brw");
  console.log("skip help");

  await page.waitFor(200);
  await page.click(".css-1pj8e72");
  await page.waitFor(200);
  await page.click(".css-1pj8e72");
  console.log("chart 1s");

  setTimeout(async () => {
    await recorder.stop();
    await browser.close();
    console.log("finished");
  }, 1000 * 15);
})();
