var queryParam = window.location.href.split("?");
queryParam = queryParam[1].split("&");
var nombreJugador = queryParam[0];
var nivel = queryParam[1];
var life = queryParam[2];
var time = queryParam[3];

/////////////////////////////////////////////////////
var home = document.getElementById("home");
var sigNivel = document.getElementById("sigNivel");
var reJugar = document.getElementById("reJugar");

function nextLvl (nivel){
    var niveles = ["Facil","Medio","Dificil","OjoAbsoluto"];
    for (var i = 0; i<niveles.length; i++)
    {
        if (nivel==niveles[i])
        {
            if (i==niveles.length-1) return niveles[0];
            return niveles[i+1];
        } 
        //else ERROR        
    }
}

home.onclick=function(){
    window.location = "index.html";
}
if (life>0)
{
    sigNivel.onclick=function(){
        window.location=`game.html?${nombreJugador}&${nextLvl(nivel)}`;
    }
}
else sigNivel.className= "btn-anulado";


reJugar.onclick=function(){
    window.location=`game.html?${nombreJugador}&${nivel}`;
}


////////////////////////BOTONES///////////////////////////
var resultado = document.getElementById("resultado");
var saludo = document.getElementById("saludo");
var dificultad = document.getElementById("dificultad");
var vidas = document.getElementById("vidas");
var tiempo = document.getElementById("tiempo");
var puntos = document.getElementById("puntos");
var jugador = document.getElementById("jugador");
var corazon;

var puntaje = Math.floor((life*1200)/time);


function victoria (){
    if (life>0)
    {
        return true;
    } 
    else return false;
}
function corazones(){
    corazon = document.getElementsByClassName("corazones");
    
}

function dibujador (){

    if (victoria())
    {
        resultado.innerText = "¡Ganaste!";
        saludo.innerText = "Felicidades ";        
        for (var i =0; i<life; i++)
        {
            vidas.innerHTML+=`<div class="corazones"></div>`;
        }
        corazones();
    }
    else
    {
        resultado.innerText = "¡Perdiste!";
        saludo.innerText = "Lo siento "
        vidas.innerHTML+=`<div class="calavera"></div>`; 
    }
    jugador.innerHTML = nombreJugador;
    dificultad.innerHTML += `<p>${nivel}</p>`;
    tiempo.innerHTML+=`<div>${time+" seg"}</div><div class="tiempo"></div>`;
    puntos.innerHTML+=`<div>${puntaje}</div><div class="monedas"></div>`; 
}

dibujador();