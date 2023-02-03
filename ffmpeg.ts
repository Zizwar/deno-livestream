import process from "./process.ts";

const args =
  `ffmpeg -framerate 1/6 -pattern_type glob -i ./static/images/*.jpg -i ./static/sounds/ai.mp3 -shortest -c:v libx264 -r 30 -pix_fmt yuv420p output6.mp4`.split(" ");
const cmd = [...args];
const ff = await process({ cmd });
console.log(ff);
//console.log(ff.error);