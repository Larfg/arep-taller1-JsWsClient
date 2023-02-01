let connected;
let ws;

function sendJSON() {
  let pelicula = document.querySelector(".pelicula");
  let titulo = document.querySelector("#titulo");
  console.log(titulo.value);
  if(connected){
    ws.send(titulo.value);
  }
  ws.close();
}

function connectWS(){
    let url = "ws://localhost:35000/";
    ws = new WebSocket(url);
    ws.binaryType = "arraybuffer";
    ws.onopen = function () {
      console.log("open");
      sessionStorage.echoServer = url;
    };
    ws.onclose = function () {
      console.log("close");
    };
    ws.onerror = function () {
      console.log("error");
    };
    ws.onmessage = function (e) {
      if (e.data instanceof Blob) {
        let reader = new FileReader();
        reader.onload = function (e) {
          console.log(
            "received blob: " + encodeHexString(new Uint8Array(e.target.result))
          );
        };
        reader.readAsArrayBuffer(e.data);
      } else if (e.data instanceof ArrayBuffer) {
        console.log("received array buffer: " + encodeHexString(new Uint8Array(e.data)));
      } else {
        console.log("received: " + e.data);
      }
    };
}

