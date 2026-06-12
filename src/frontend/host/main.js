import Peer from "peerjs";

const peer = new Peer('host', {
  host: location.hostname,
  port: location.port,
  path: '/peerjs',
  secure: false,
  debug: 3
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

peer.on('call', (call) => {
  console.log('Received call, answering with stream');
  call.answer(window.localScreenStream)
})

peer.on('error', (err) => {
  console.error(err);
});