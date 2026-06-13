import peer from "peerjs";

console.log('Setup peer')
window.peer = new peer({
  host: location.hostname,
  port: location.port,
  path: '/peerjs',
  secure: false,
  debug: 3,
  config: {
    iceServers: []
  }
})

window.peer.on('open', () => {
  console.log("Signal server connection established, connecting with 'host'");
  window.peer.connect('host');

  window.peer.on('call', (call) => {
    console.log("Received call from host after succesful connection")
    console.log("Answering call")
    call.answer();

    call.on('stream', (stream) => {
      console.log("Receiving stream");
      window.remoteStream = stream
      window.remoteScreen.srcObject = stream;
        // Explicitly force the browser to decode and render the stream
      window.remoteScreen.play().catch(error => {
        console.error("Playback failed. Browser blocked autoplay:", error);
      });
    })
  })
})

window.peer.on('error', (error) => {
  console.error(error);
})
