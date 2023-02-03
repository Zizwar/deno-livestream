import process from "./process.ts";

const args =
  `ffmpeg -framerate 1 -i ai(%d).jpg -c:v libx264 -r 30 output.mp4`.split(" ");
const cmd = [...args];
const ff = await process({ cmd });
console.log(ff);
