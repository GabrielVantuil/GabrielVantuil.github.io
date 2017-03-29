var isconnected=0;
var pw_buffer;
var pw_flag=0;
  function mudaEstado(){
    if(isconnected){
      doDisconnect();
    }
    else{
      doConnect();
    }
  }
  function init(){
    document.getElementById("ip").defaultValue = "ws://192.168.0.118:8266/";
  	document.getElementById("entrada").value = "esp8266";
  }

  function doConnect(){
    websocket = new WebSocket(document.getElementById("ip").value);
    websocket.onopen    = function(evt) { onOpen(evt) };
    websocket.onclose   = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror   = function(evt) { onError(evt) };
  }

  function onOpen(evt)  {
    writeToScreen("connected\n");
    document.getElementById("connectButton").value="Desconectar"; //////////////////////////////////////////////
    isconnected=1;
    doSend(document.getElementById("senha").value);
  }
    
  function onClose(evt)  {
    writeToScreen("disconnected\n");
    document.getElementById("connectButton").value="Conectar"; //////////////////////////////////////////////
    isconnected=0;
  }

  function onMessage(evt)  {
    writeToScreen(evt.data);
  }

  function onError(evt)  {
    writeToScreen('error: ' + evt.data + '\n');
    websocket.close();
    document.getElementById("connectButton").value="Conectar"; //////////////////////////////////////////////
    isconnected=0;
  }

  function doSend(message)  {
    websocket.send(message+'\n');
    websocket.send('\r');
  }

  function writeToScreen(message)  {
    document.getElementById("saida").value += message;
    document.getElementById("saida").scrollTop = document.getElementById("saida").scrollHeight;

  }
  window.addEventListener("load", init, false);
  function sendText() {
    doSend( document.getElementById("entrada").value);
  }
  function clearText() {
    document.getElementById("saida").value = "";   
   }
  function doDisconnect() {
    websocket.close();
  }
  function IPenter(event){
    var tecla=event.keyCode;
    if(tecla==13){
      mudaEstado();
    }
  }
