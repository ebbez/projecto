import Peer from "peerjs";

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
    window.localScreenStream = stream;
    window.localScreen.srcObject = stream;
    window.localScreen.autoplay = true;
  })
}

getScreenMedia()

peer.on('connection', (conn) => {
  if (window.localScreenStream) {
    const call = peer.call(conn.peer, window.localScreenStream);
  }
})

peer.on('error', (err) => {
  console.error(err);
});
