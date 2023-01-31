import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

import stream from "./stream.ts";

const { log } = console;
const delay = (milliseconds = 1000) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const querySelectors = {
  header: ".css-12pbmn6",
  intro_remove: ".css-1u2nk9f",
  chartSelectSecend: ".css-1pj8e72",
  orderBook: ".css-1l49xsz",
  coockie: "#onetrust-accept-btn-handler",
};


puppeteer
  .launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    executablePath: "/usr/bin/google-chrome-stable",
  })
  .then(async (browser) => {
    //

    const TIME_AWAIT_NAVIGATE = 55; //second

    const page = await browser.newPage();

    await page.goto("https://www.binance.com/en/trade/BTC_USDT?layout=pro", {
      waitUntil: "domcontentloaded", //"networkidle2",
    });

    await delay(TIME_AWAIT_NAVIGATE * 1000);
    ///*
    await page.click("#onetrust-accept-btn-handler");
    log("accept cookies");

    await delay(2000);
    await page.click(".css-4rbxuz");
    await delay(2000);
    await page.click(".css-1sh2brw");
    await delay(2000);
    log("skip help");

    await page.click(".css-1pj8e72");

    await delay(2000);
    await page.click(".css-1pj8e72");
    log("chart 1s");
    delay(200);
    //*/
    await page.evaluate(async () => {

      //  document.body.style.zoom = 0.8;
  
    });
    log("zoom chart");
    console.log("goto stream ");
    await stream({
      page,
      key: "",
      //resolution:"1920x1080",
      fps: 8,
      prepare: function (browser, page) {},
      render: function (browser, page, frame) {},
      screenshot: {
        type: "jpeg",
        quality: 45,
        fullPage: false,
        clip: {
          x: 0,
          y: 100,
          width: 1280,
          height: 720,
        },
      },
    });
    console.log("stream");
    //  await browser.close();
  });
