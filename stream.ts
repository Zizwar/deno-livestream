import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
const {  error, info } = console;
const log =()=>{}
const ffmpegArgs = ({ fps, resolution, preset, rate, threads }) => [
  // IN
  "-f",
  "image2pipe",
  "-use_wallclock_as_timestamps",
  "1",
  "-i",
  "-",
  "-f",
  "lavfi",
  "-i",
  "anullsrc",
  // OUT
  "-deinterlace",
  "-s",
  resolution,
  "-vsync",
  "cfr",
  "-r",
  fps,
  "-g",
  fps * 2,
  "-vcodec",
  "libx264",
  "-x264opts",
  "keyint=" + fps * 2 + ":no-scenecut",
  "-preset",
  preset,
  "-b:v",
  rate,
  "-minrate",
  rate,
  "-maxrate",
  rate,
  "-bufsize",
  rate,
  "-pix_fmt",
  "yuv420p",
  "-threads",
  threads,
  "-f",
  "lavfi",
  "-acodec",
  "libmp3lame",
  "-ar",
  "44100",
  "-b:a",
  "128k",
  "-f",
  "flv",
];
export default async (options) => {
  const browser = options.browser || (await puppeteer.launch());
  const page = options.page || (await browser.newPage());

  await options.prepare(browser, page);

  const ffmpegPath = options.ffmpeg || "ffmpeg";
  const fps = options.fps || 30;
  const resolution = options.resolution || "1920x1080";
  const preset = options.preset || "medium";
  const rate = options.rate || "2500k";
  const threads = options.threads || "2";

  const outUrl = options.output || "rtmp://a.rtmp.youtube.com/live2/";

  const args = ffmpegArgs({ fps, resolution, preset, rate, threads });

  const fullUrl = outUrl + options.key;
  args.push(fullUrl);
  console.log("start ffmpeg");
  const ffmpeg = await Deno.run({
    cmd: [ffmpegPath, ...args],
    stderr: "piped",
    stdout: "piped",
    stdin: "piped",
  });

  //info("--ffmpeg", ffmpeg);
  //const { code } = await ffmpeg.status();
  const code = 0;
  log({ code });

  let screenshot = null;
  /*
  if (options.pipeOutput) {
    ffmpeg.stdout.pipe(process.stdout);
    ffmpeg.stderr.pipe(process.stderr);
  }
  */

  while (true) {
    await options.render(browser, page);
    log("render screan ");
    screenshot = await page.screenshot({ type: "jpeg" });
    log("creat screan ");
    /*
    if (code === 0) {
      // const rawOutput = await p.output();
      await Deno.stdout.write(screenshot);
      log("write ok");
    } else {
      const rawError = await ffmpeg.stderrOutput();
      const errorString = new TextDecoder().decode(rawError);
      console.error("err=");
    }
    */

   // const stdin = ffmpeg.stdin.getWriter();
    
   // await stdin.write(screenshot);
    //await stdin.close();
    
    //const s = await ffmpeg.status;
    log("stdin.close");
    
    //console.info(ffmpeg.stdin);
    /*
    let r = readerFromStreamReader(screenshot);
    await Deno.copy(r, ffmpeg.stdin);
    ffmpeg.stdin.close();
    await ffmpeg.status();
   
*/
    await ffmpeg.stdin.write(screenshot);
    log("write.screen");
  }
};
