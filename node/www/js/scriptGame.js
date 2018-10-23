var queryParam = window.location.href.split("?");
queryParam = queryParam[1].split("&");
var nombreJugador = queryParam[0];
var nivel = queryParam[1];
//////////////////////////////////////////////////////

var home = document.getElementById("home");
home.onclick=function(){
    window.location = "index.html";
}

////////////////////////BOTONES///////////////////////////

var help = document.getElementById("help");
var row = document.getElementsByClassName("row");
row[0].style.display="none";
var ayuda = document.getElementById("ayuda");
var helpClose = document.getElementById("helpClose");

help.onclick=function(){
    row[0].style.display="flex";
    row[1].style.display="none";
    ayuda.className="help help-game";  
}

helpClose.onclick=function(){
    row[1].style.display="flex";
    row[0].style.display="none";
    ayuda.className="btn button-end";
}
////////////////////////HELP/////////////////////////


////////////////////////BOTONES//////////////////////

var modo = [3]; // modos RGB=3 , CMYK=4 => no implementado
var contenedorCuadrados = document.getElementById("cajita"); // espacio donde dibujar cuadrados
var rgb = [0,0,0]; 
var dificultad = { //parametros de dificultad
    nivel : nivel,
    cantidadCuadrados: 1,
    deltaRGB : 255,
    rgb : [true,true,true]
};

var life = 3 ; //seteo de vidas inciciales
var vidas = document.getElementById("vidas"); // espacio donde dibujar las vidas
var consigna = document.getElementById("consigna"); // espacio donde dibujar la consigna
var fondo = document.getElementsByTagName("body"); // fondo
var iconos = document.getElementById("iconLvl"); // icono de dificultad
var mensajes = document.getElementById("mensajes"); // linea de mensaje
mensajes.value = "Buenas suerte "+nombreJugador;
var corazon;
var tiempoInicio;

var tiempoInicio = new Date();

function estoyVivo() { //chequea si te quedan vidas
    if (life<1)
    {
        dibujadorVidas();
        return false;
    }
    else {
        dibujadorVidas();
        return true;
        
    }
}

function runing (estado,acierto){  // si te quedas sin vidas o acertas redirigido a END 
    if (estado && !acierto)  //erraste 
    {  
        if(life>2)
        {
            mensajes.value = "Buenas suerte "+nombreJugador;
        }
        else if(life==1)
        {
            mensajes.value = "Ultima chance";    
        }
        else
        {
            mensajes.value = "Le erraste mono, te quedan "+ life +" vidas";
        }
       
      

    }
    else //ganaste o perdiste
    {
        if(estado)
        {
            mensajes.value = "Correcto!";
        }
        else
        {
            mensajes.value = "Lo siento!";
        }
        var tiempoFinal = new Date();
        var dif = tiempoFinal.getTime() - tiempoInicio.getTime();
        var tiempoDif = dif / 1000;
        console.log(tiempoDif)

        pintar(estado);

        setTimeout(function(){
        window.location=`end.html?${nombreJugador}&${nivel}&${life}&${tiempoDif}`; 
        }, 1000);
        
    }
}

function selectorNivel (lvl){ // seteao segun nivel
    switch(lvl){
        case "Facil":
        dificultad.cantidadCuadrados=4;
        dificultad.deltaRGB=150;
       
        break;

        case "Medio":
        dificultad.cantidadCuadrados=6;
        dificultad.deltaRGB=150;
      
        break;

        case "Dificil":
        dificultad.cantidadCuadrados=8;
        dificultad.deltaRGB=80;
        dificultad.rgb[ Math.floor((Math.random()*10)%3) ] = false;
        

        break;

        case "OjoAbsoluto":
        dificultad.cantidadCuadrados=8;
        dificultad.deltaRGB=30;
    
        var vecAux = [[false,true,true],[true,false,true],[true,true,false]];
        var numAux = Math.floor(Math.random()*10)%3;
        for (var i = 0; i<vecAux[numAux].length; i++)
        {
            if (vecAux[numAux][i]) dificultad.rgb[i]= false; 
        }

        break;

    }
}

function generadorRGB (margen,ventana,colorBase){ // genera un numero entre 0 y 255
 //  return Math.floor((Math.random()*1000)%255);
    
    if (rndFlag > 2)
    {
        if (ventana>199)
        {
            var aleatorio = ( Math.floor(Math.random()*1000) % (margen - ventana) ); 
            return aleatorio;
        }
        else
        {
            var aleatorio = ( Math.floor(Math.random()*1000) % (margen - ventana) ) +
                            ( colorBase - Math.floor( (margen - ventana)/2 ) ); 
            return aleatorio;
        }
    }
    else
    {
        rndFlag ++;
        return Math.floor((Math.random()*1000)%margen)+ventana;
    }
}

function corroboracionRangoRGB (valorRGB){ // limita el valor RGB entre 0 y 255 
    if (valorRGB<0)
    {
        return valorRGB=0;
    }
    else if(valorRGB>255)
    {
        return valorRGB=255;
    }
    else return valorRGB;
}

function dibujadorCuadrados (){ // dibujador de cuadrados dinamico

    for (var i = 0 ; i<dificultad.cantidadCuadrados; i++) 
    {    
        if(cuadradoRespuesta.numero==i) //posicion cuadrado correcto
        {
            contenedorCuadrados.innerHTML+=`<div class='contenedorColores'>
                                            <div name='cuadrado' class='cuadradosColores'  
                                            style='background-color: rgb(${cuadradoRespuesta.rgb[0]},
                                                                        ${cuadradoRespuesta.rgb[1]},
                                                                        ${cuadradoRespuesta.rgb[2]})'>
                                            </div></div>`;        
             
        }
        else // seteo resto de cuadrados
        {
            for (var j = 0; j<modo[0];j++)
            {
                if (dificultad.rgb[j]){  // color habilitado 
                    rgb[j] = corroboracionRangoRGB(generadorRGB(255,dificultad.deltaRGB,cuadradoRespuesta.rgb[j]));
                }
                else // color deshabilitado
                {
                    rgb[j] = cuadradoRespuesta.rgb[j];                                                                                                               
                }
            }
            
            // dibujado del resto de los cuadrados
            contenedorCuadrados.innerHTML+=`<div class='contenedorColores'> 
                                            <div name='cuadrado' class='cuadradosColores' 
                                                style='background-color: rgb(${rgb[0]},${rgb[1]},${rgb[2]})'>
                                            </div>
                                            </div>`;   
        }
    }
    
}

for(var i = 0; i<life ; i++)
    {
        vidas.innerHTML+=`<div class="corazones" style="display: none"></div>`;
    }
    corazon = document.getElementsByClassName("corazones");

function dibujadorVidas(){ // dibujador de corazones dinamico
    
    
    for(var i = 0; i<corazon.length ; i++)
    {
         
        corazon[i].style.display = "none";
    }

    for(var i = 0; i<life ; i++)
    {
         
        corazon[i].style.display = "inline-flex";
    }

    
}

function dibujadorConsigna(){ // dibujador de titulo RGB
    consigna.innerText+=`(${cuadradoRespuesta.rgb[0]} - ${cuadradoRespuesta.rgb[1]} - ${cuadradoRespuesta.rgb[2]})`;
}

function anular (posicion){ // anula el clickeo del cuadrado y cambia su color

    cuadrados[posicion].className ="cuadradosColoresDeshabilitados";
    
    cuadrados[posicion].usado = true;       
    
} 

function pintar (estado){ //metodo de pintado cuando ganas . por ahora solo el background 
   
    for (var i = 0; i<cuadrados.length; i++)
    {
        /*if (life!=0)
        {
            cuadrados[i].style.background ="none";
        }
        else*/ 
        cuadrados[i].usado = true;
    }
    //fondo[0].style.backgroundColor = "none";
    if (estado)
    {
        
    fondo[0].style.backgroundImage = `linear-gradient(141deg, 
        rgb(${cuadradoRespuesta.rgb[0]},
            ${cuadradoRespuesta.rgb[1]},
            ${cuadradoRespuesta.rgb[2]})
             60%, #666a86 100%) `;

    }
} 

function clickEventoCuadrado (){ //disparador de estados del juego con click
        
    for (var i =0;i<cuadrados.length;i++){

        cuadrados[i].onclick=function (){
                //clickeado igual a respuesta ? 
            if (cuadradoRespuesta.numero == this.posicion) // acierto= true ,  redirigir a END
            {
                
                console.log ("ganaste");
                runing(estoyVivo(),true);
                

            }
            else {                        // chequear vidas , acierto= false , anular cuadrado clikeado
                console.log ("erraste");
                if (!this.usado)
                {
                    if(life>0) life--;           
                    anular(this.posicion);
                    runing(estoyVivo(),false);

                }                

            }

        }   
    }
}

function posiciones (){ // le asigna una posicion a cada cuadrado creado y setea su uso inicial
    for (var i=0; i<cuadrados.length; i++)
    {
        cuadrados[i].posicion = i;
        cuadrados[i].usado = false;
    }
}


////////////////////////////////////////////////////////INICIO PROGRAMA

selectorNivel(nivel); //cargo nivel a los objetos de js actual
var rndFlag = 0 ;
var cuadradoRespuesta = { //seteo cuadrado correcto (referencia)
    numero : Math.floor((Math.random()*10)%dificultad.cantidadCuadrados),
    rgb : [generadorRGB(100,75),generadorRGB(100,75),generadorRGB(100,75)]
} ;

dibujadorCuadrados(); //dibujo
dibujadorVidas();     //dibujo
dibujadorConsigna();  //dibujo

var cuadrados = document.getElementsByName("cuadrado"); //tomo datos del HTML afectado por el JS

posiciones(); // asigno segun los cuadrados dibujados
clickEventoCuadrado(); // escuchador de clicks


