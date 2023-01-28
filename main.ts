import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

import stream from "./stream.ts";

const { log } = console;
const delay = (milliseconds = 1000) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

puppeteer
  .launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    executablePath: "/usr/bin/google-chrome-stable",
  })
  .then(async (browser) => {
    //

    const TIME_AWAIT_NAVIGATE = 20; //second
    const TIME_AWAIT_RECORD = 50;
    const page = await browser.newPage();

    await page.goto("https://op1js.deno.dev", {
      waitUntil: "domcontentloaded"//"networkidle2",
    });
/*
    await delay(TIME_AWAIT_NAVIGATE * 1000);

    page.click("#onetrust-accept-btn-handler"); // Clicking the link will indirectly cause a navigation

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
    //*/
    await page.evaluate(() => (document.body.style.zoom = 1.5));
    log("zoom chart");
    console.log("goto url ");
    await stream({
      page: page,
      key: "",
      fps: 30,
      prepare: function (browser, page) {},
      render: function (browser, page, frame) {},
    });
    console.log("stream");
    //  await browser.close();
  });
