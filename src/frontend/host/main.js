import Peer from "peerjs";
import QRCode from "qrcode";

import './style.css';

const peer = new Peer('host', {
  host: location.hostname,
  port: location.port,
  path: '/peerjs',
  secure: false,
  config: {
    iceServers: []
  }
})

function getScreenMedia() {
  navigator.mediaDevices.getDisplayMedia({
    displaySurface: 'monitor',
    audio: false,
    systemAudio: 'exclude',
    windowAudio: 'exclude',
    selfBrowserSurface: 'exclude'
  }).then((stream) => {
    window.app.innerHTML = "";
    const localScreen = document.createElement('video')
    localScreen.id = "localScreen";
    localScreen.srcObject = stream;
    localScreen.autoplay = true
    window.app.appendChild(localScreen)

    window.localScreenStream = stream;
  })
}

let screensArr = [];
window.myAPI.onScreens((screens) => {
  screensArr = screens;

  const list = document.createElement('ol');
  list.className = "screenslist"

  for (const screenId in screens) {
    console.log(screenId);
    const item = document.createElement('li');
    item.className = "screen"
    const img = document.createElement('img');
    img.src = screens[screenId].thumbnail.toDataURL();

    item.appendChild(document.createTextNode(screens[screenId].name))

    item.appendChild(img);
    item.addEventListener('click', (el) => {
      console.log('Pick screen', screenId)
      window.myAPI.pickScreen(screenId)
    })

    list.appendChild(item);
  }

  window.app.appendChild(list);
});

window.myAPI.onAddress((address) => {
  console.log('Received address: ' + address)
  const urlQR = document.createElement('canvas')
  urlQR.id = 'urlQR';
  QRCode.toCanvas(urlQR, address, { width: 500 });
  document.body.appendChild(urlQR);
});

getScreenMedia()

peer.on('connection', (conn) => {
  if (window.localScreenStream) {
    const call = peer.call(conn.peer, window.localScreenStream);
  }
})

peer.on('error', (err) => {
  console.error(err);
});
