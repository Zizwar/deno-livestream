# pptr-stream-yt
puppeteer stream youtube

1. install

nodejs 16:
```
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt update
sudo apt -y install nodejs

#if Errors were encountered while processing
 sudo dpkg -i --force-overwrite /var/cache/apt/archives/nodejs_16.19.0-deb-1nodesource1_amd64.deb
```
////if Error Could not find Chromium

sudo npm install puppeteer --unsafe-perm=true --allow-root

apt-get -y install ffmpeg

chromium:
```
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt update && sudo apt install ./google-chrome-stable_current_amd64.deb
```


////if probelm Missing Xserveer or $DISPLAY

export DISPLAY=:1 && /usr/bin/google-chrome-stable

2. config

executablePath = '/usr/bin/google-chrome-stable'
```
  const browser = await puppeteer.launch({
  //  headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    executablePath: "/usr/bin/google-chrome-stable",
  });

```
