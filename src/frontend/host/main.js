import Peer from "peerjs";

const peer = new Peer('host', {
  host: location.hostname,
  port: location.port,
  path: '/peerjs',
  secure: false,
  debug: 3,
  config: {
    iceServers: []
  }
})

function getScreenMedia() {
  navigator.mediaDevices.getDisplayMedia({
    
  }).then((stream) => {
    window.localScreenStream = stream;
    window.screenvideo.srcObject = stream;
    window.screenvideo.autoplay = true;
  })
}

getScreenMedia()

peer.on('connection', (conn) => {
  if (window.localScreenStream) {
    console.log("Received connection, responding with call");
    window.call = peer.call(conn.peer, window.localScreenStream);
  }
})

peer.on('error', (err) => {
  console.error(err);
});
