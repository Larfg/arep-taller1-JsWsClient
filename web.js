let connected;
let ws;
let flag = false;

/**
 * Funcion que nos permite realizar una consulta a un ws, enviar un titulo y recibir la información de una pélicula.
 */
function sendJSON() {
  AbortSignal.timeout ??= function timeout(ms) {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.close(), ms);
    return ctrl.signal;
  };
  let titulo = document.querySelector("#titulo").value;
  console.log(titulo);
  let url = "http://localhost:35000/";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
    signal: AbortSignal.timeout(0),
    body: "titulo:" + titulo,
  });
  function makeHttpObject() {
    if ("XMLHttpRequest" in window) return new XMLHttpRequest();
    else if ("ActiveXObject" in window)
      return new ActiveXObject("Msxml2.XMLHTTP");
  }
  var request = makeHttpObject();
  request.withCredentials = false;
  request.open("GET", "http://localhost:35000/", true);
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      document.getElementById("pelicula").innerHTML = request.responseText;
      document.getElementById("pelicula").style.visibility = "visible";
      console.log(request.responseText);
    }
  };
  flag = true;
}
