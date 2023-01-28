
# deno-livestream
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Zizwar/deno-livestream
)


clone: 
```sh 
git clone https://github.com/Zizwar/deno-livestream.git 
```
## install
# Deno Land
1- https://deno.land/#installation

2- https://github.com/lucacasonato/deno-puppeteer

3- run

```sh
$ deno run --allow-net --allow-env --allow-read -A --unstable --allow-run main.ts
```
 - in docker (coming)
 ```sh
$ docker build -t app . && docker run -it --init -p 1993:1993 app
```

# Nodejs 16
```
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt update
sudo apt -y install nodejs

#if Errors were encountered while processing
 sudo dpkg -i --force-overwrite /var/cache/apt/archives/nodejs_16.19.0-deb-1nodesource1_amd64.deb
```


////if Error Could not find Chromium

sudo npm install puppeteer --unsafe-perm=true --allow-root

sudo apt -y install ffmpeg

chromium:
```
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt update 
sudo apt -y install ./google-chrome-stable_current_amd64.deb
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
