# pptr-stream-yt
puppeteer stream youtube

1. install

nodejs 18:
```
curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt update
sudo apt install nodejs
```
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
