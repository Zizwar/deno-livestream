const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");

//
const { log } = console;
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
//

const TIME_AWAIT_NAVIGATE = 12; //second
const TIME_AWAIT_RECORD = 60;
//
(async () => {
  const browser = await puppeteer.launch({
     headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    executablePath: "/usr/bin/google-chrome-stable",
  });
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page);

  log("start recording");
  await recorder.start("./out/video/simple.mp4"); // supports extension - mp4, avi, webm and mov
  //await page.goto('https://bing.com');

  await page.goto("https://www.binance.com/en/trade/BTC_USDT?layout=pro", {
    waitUntil: "domcontentloaded",
  });

  //#onetrust-accept-btn-handler     accept cookies
  //.css-4rbxuz  skip help
  //.css-1sh2brw skip help

  //.css-1pj8e72  line
  //.css-1pj8e72   1s
  //.css-1rgzdx   chart tridingview
  //.css-lzd0h4   chart binance
  //await page.waitFor(2000);
  // await Promise.all([
  //page.waitForNavigation(); // The promise resolves after navigation has finished
  await delay(TIME_AWAIT_NAVIGATE * 1000);

  //page.click("#onetrust-accept-btn-handler"); // Clicking the link will indirectly cause a navigation

  //await page.click("#onetrust-accept-btn-handler");
  log("accept cookies");

  //await page.waitFor(100);
  await delay(2000);
  await page.click(".css-4rbxuz");
  //await page.waitForTimeout(5000);
  //await page.waitForTimeout(1000);
  await page.click(".css-1sh2brw");
  log("skip help");

  //await page.waitForTimeout(1000);
  await page.click(".css-1pj8e72");
  //await page.waitForTimeout(1000);
  await page.click(".css-1pj8e72");
  log("chart 1s");
  delay(200);
  await page.evaluate(() => (document.body.style.zoom = 1.5));
  log("zoom chart");

  setTimeout(async () => {
    await recorder.stop();
    await browser.close();
    log("finished recording");
  }, TIME_AWAIT_RECORD * 1000);
})();
