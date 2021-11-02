let pwmValue = 255;
function sendCommand(cmd) {
    try {//http://192.168.15.23
        fetch("/"+cmd+"?PWM="+pwmValue);
    }catch (e) {
        logMyErrors(e);
     }
}
function changedPWM(){
    pwmValue = document.getElementById("pwmSlider").value;
}





// let ip = "";
// $(document).ready(function() { 
//     ip = getCookie("ipAddress");
//     console.log("ip "+ip);
//     $("#ipAddr").val(ip);
//     ip = "192.168.15.23";
// });
// function changeCookies(){
//     ip = $("#ipAddr").val();
//     setCookie("ipAddress", ip, 180);
//     console.log(ip);
// }

// function setCookie(cname, cvalue, exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     let expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   }


// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for(let i = 0; i <ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }
