import express from "express";
import { ExpressPeerServer } from "peer";
import ViteExpress from "vite-express";
import http from 'http';
import pkg from "electron";
import path, { dirname } from "path";
import { networkInterfaces } from "os";
const { app: electronApp, BrowserWindow, session, desktopCapturer } = pkg; 

const app = express();
const port = process.env.PORT || 3000
const server = http.createServer(app);

const peerjsServer = new ExpressPeerServer(server, {
  path: '/peerjs',
  proxied: true,
  debug: 3
});

app.use(peerjsServer);

ViteExpress.bind(app, server);

app.get("/hello", (req, res) => {
  res.send("Hello Vite!");
});

server.listen(port, () => {
  electronApp.whenReady().then(() => {
    const win = new BrowserWindow({
      width: 1000,
      height: 500,
      webPreferences: {
        preload: path.join(dirname(import.meta.dirname), 'frontend/host/preload.js')
      }
    });

    let displayRequestCallback, screens;

    // Handle getDisplayMedia() requests from renderer
    session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
      desktopCapturer.getSources({ types: ['screen']}).then((sources) => {
        displayRequestCallback = callback;
        
        screens = sources;
        win.webContents.send('screens', sources);

      })
    }, {useSystemPicker: true});

    // Screen was selected on renderer process and will be given to callback from setDisplayMediaRequestHandler
    win.webContents.ipc.on('pickScreen', (_event, screen) => {
      displayRequestCallback({ video: screens[screen] });

      // Determine a ipv4 address to give to renderer so QR-code can be displayed
      const nets = networkInterfaces();
      OUTER_LOOP:
      for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
          if (net.family === 'IPv4' && !net.internal) {
            console.log(net.address)
            win.webContents.send('address', `http://${net.address}:${port}`);
            break OUTER_LOOP;
          }
        }
      }
    })



    setTimeout(() => win.loadURL(`http://localhost:${port}/host/`), 300);
  })
});
