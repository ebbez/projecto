import "./style.css";

import peer from "peerjs";

console.log('Setup peer')
window.peer = new peer({
  host: location.hostname,
  port: location.port,
  path: '/peerjs',
  secure: false,
  debug: 3
})

window.peer.on('open', () => {
  window.call = window.peer.call('host', new MediaStream());

  window.call.on('stream', (stream) => {
    console.log("Receiving stream");
    window.remoteStream = stream
    window.remoteScreen.srcObject = stream;
    window.remoteScreen.autoplay = true;
  })
})

window.peer.on('error', (error) => {
  console.error(error);
})