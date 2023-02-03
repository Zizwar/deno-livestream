import process from "./process.ts";

/*const args =
  `ffmpeg -framerate 1/6 -pattern_type glob -i ./static/images/*.jpg -i ./static/sounds/ai.mp3 -shortest -c:v libx264 -r 30 -pix_fmt yuv420p output6.mp4`.split(" ");
  */
 
  /*
const args =
`ffmpeg -stream_loop -1 -re -pattern_type glob -i ./static/images/*.jpg -i ./static/sounds/ai.mp3 -c:v libx264 -vf scale=400:-2 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 128k -ac 2 -ar 44100 -f flv rtmp://localhost/live/stream`.split(" ");
*/

const args =
`ffmpeg -stream_loop -1 -re -i ./static/mp4/tom.mp4 -pix_fmt yuvj420p -x264-params keyint=48:min-keyint=48:scenecut=-1 -b:v 4500k -b:a 128k -ar 44100 -acodec aac -vcodec libx264 -preset medium -crf 28 -threads 4 -f flv rtmp://localhost/live/stream`.split(" ");

const cmd = [...args];
const ff = await process({ cmd });
console.log(ff);
console.log(ff.error);

