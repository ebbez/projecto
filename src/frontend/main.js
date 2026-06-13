import peer from "peerjs";

import './style.css';

window.peer = new peer({
  host: location.hostname,
  port: location.port,
  path: '/peerjs',
  secure: false,
  config: {
    iceServers: []
  }
})

window.peer.on('open', () => {
  window.peer.connect('host');

  document.querySelector("#app").innerHTML = "Verbindingsverzoek aan host gestuurd";

  window.peer.on('call', (call) => {
    document.querySelector("#app").innerHTML = "Gebeld door host, automatisch opnemen...";
    call.answer();
    document.querySelector("#app").innerHTML = "Opgenomen. Wachten op beeld...";

    call.on('stream', (stream) => {
      window.remoteStream = stream
      //window.remoteScreen.srcObject = stream;
      document.querySelector("#app").innerHTML = "<div id='connectButton'>Beeld aanwezig. Druk op deze knop om het scherm in volledig scherm weer te geven</div>";

      document.querySelector("#connectButton").addEventListener('click', () => {
        document.querySelector("#app").innerHTML = "<video id='remoteScreen'></video>";
        const remoteScreen = document.querySelector("#remoteScreen");
        remoteScreen.srcObject = stream;
        remoteScreen.autoplay = true;

        document.body.requestFullscreen();
      })
    })
  })
})
