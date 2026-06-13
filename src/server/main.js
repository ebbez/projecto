import express from "express";
import { ExpressPeerServer } from "peer";
import ViteExpress from "vite-express";
import http from 'http';
import pkg from "electron";
const { app: electronApp, BrowserWindow, session, desktopCapturer } = pkg; 

const app = express();
const port = process.env.PORT || 3000
const server = http.createServer(app);

const peerjs = new ExpressPeerServer(server, {
  path: '/peerjs',
  proxied: true,
  debug: 3
});

app.use(peerjs);

ViteExpress.bind(app, server);

app.get("/hello", (req, res) => {
  res.send("Hello Vite!");
});

server.listen(port, () => {
  electronApp.whenReady().then(() => {
    const win = new BrowserWindow({
      width: 750,
      height: 350
    });

    session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
      desktopCapturer.getSources({ types: ['screen']}).then((sources) => {
        callback({video: sources[0]})
      })
    }, {useSystemPicker: true})

    setTimeout(() => win.loadURL(`http://localhost:${port}/host/`), 300);
  })
});
