//////////////////////////////////////////
var btn1 = document.getElementById("btn1");
var inp1 = document.getElementById("inp1");
var go = document.getElementById("go");
var nombreJugador;
var lvl= document.getElementById("lvl");
//lvl.value = lvl.value.split(' ').join(''); No funciona quitarle espacios
var help = document.getElementById("help");
var row = document.getElementsByClassName("row");
row[0].style.display="none";
var ayuda = document.getElementById("ayuda");
var nivel;
var helpClose = document.getElementById("helpClose");

/*window.location.href+="?";
var queryParam = window.location.href.split("?");
if (queryParam[1]=="")
{      
    nombreJugador = queryParam[1];
    inp1.placeholder = nombreJugador;
    inp1.value = nombreJugador;
    console.log("adentro");
}
*/
help.onclick=function(){
    row[0].style.display="flex";
    row[1].style.display="none";
    ayuda.className="help";
  
}

helpClose.onclick=function(){
    row[1].style.display="flex";
    row[0].style.display="none";
    ayuda.className="btn button-end";
}



btn1.onclick=function(){
    btn1.style.display="none";
    inp1.style.display="inline";
}

go.onclick=function(){
    nombreJugador = inp1.value;
    nivel = lvl.value.replace(" ","");
    window.location = `timmer.html?${nombreJugador}&${nivel}`;
}

/*
inp1.onkeypress=function(){
    var keycode = (inp1.keyCode ? inp1.keyCode : inp1.which);
    if (keycode == '13') {
        console.log("funciona");
    }
}*/
