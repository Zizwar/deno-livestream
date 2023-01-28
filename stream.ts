import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
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

  const ffmpeg = await Deno.spawn(ffmpegPath, args);

  let screenshot = null;

  if (options.pipeOutput) {
    ffmpeg.stdout.pipe(process.stdout);
    ffmpeg.stderr.pipe(process.stderr);
  }

  while (true) {
    await options.render(browser, page);

    screenshot = await page.screenshot({ type: "jpeg" });

    await ffmpeg.stdin.write(screenshot);
  }
};
