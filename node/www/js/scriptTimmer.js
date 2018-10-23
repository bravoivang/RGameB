var queryParam = window.location.href.split("?");
queryParam = queryParam[1].split("&");
var nombreJugador = queryParam[0];
var nivel = queryParam[1];

document.getElementById("nombreJugador").innerHTML=nombreJugador;
document.getElementById("lvl").innerHTML=nivel;
var timmerElemento = document.getElementById("timmer");
var countTimmer= 4 ;
var iconos = document.getElementById("iconLvl");


var handlerInterval;

function timmer () {
    countTimmer--;
    timmerElemento.innerHTML=countTimmer;
  
if (countTimmer==0)
    {
        clearInterval(handlerInterval);
        timmerElemento.innerHTML="GO!";
        setTimeout(function(){
            window.location = `game.html?${nombreJugador}&${nivel}`;
        },1000)
        
    }
}

switch(nivel){
    case "Facil":
    iconos.innerHTML='<img class="iconLvl" src="img/clown.png">';
    
    break;

    case "Medio":
    iconos.innerHTML='<img class="iconLvl" src="img/viking.png">';
  
    break;

    case "Dificil":
    iconos.innerHTML='<img class="iconLvl" src="img/frankenstein.png">';
    
    break;

    case "OjoAbsoluto":
    iconos.innerHTML='<img class="iconLvl" src="img/robot.png">';
    
    break;

}   


 handlerInterval = setInterval(timmer,800);

