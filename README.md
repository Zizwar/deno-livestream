# pptr-stream-yt
puppeteer stream youtube

1. install

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

sudo apt install ./google-chrome-stable_current_amd64.deb

2. 
executablePath: '/usr/bin/google-chrome-stable'
```
const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
  });

```