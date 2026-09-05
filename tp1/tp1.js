//TP1
//Comision: 3
//Alumno: Mamani Pamela rocio
let imgFondoMenu;
let imgLogoMenu;
let imgFondo1;
let imgFondo2;
let imgFondo3;
let musicaFondo;
// listas de arreglos para almacenar las secuencias de fotogramas
let secuenciaOjos = [];
let animacionPeachBase = [];
let animacionPeachFinal = [];
let secuenciaCaminata = [];
// variables de control del tiempo y estado del programa
let marcaTiempo;
let enPresentacion = false;
let duracionTotalPresentacion = 41320;
// configuración del botón "iniciar" en el menú
let botonX = 300;
let botonY = 440;
let anchoBoton = 200;
let altoBoton = 60;
// carga previa de imagenes
function preload() {
  imgFondoMenu = loadImage("data/fondo.png");
  imgFondo1 = loadImage("data/fondo1.png");
  imgFondo2 = loadImage("data/fondo2.jpg");
  imgFondo3 = loadImage("data/fondo3.jpg");
  imgLogoMenu = loadImage("data/logo.png");
  musicaFondo = loadSound("data/BossFight.mp3"); // carga de audio
  // bloque 1: imágenes de los ojos
  for (let pasadas = 1; pasadas <= 3; pasadas++) {
    secuenciaOjos.push(loadImage("data/frame" + pasadas + ".png" ));
  }
  // bloque 2: animaciones base de peach
  for (let pasadas = 4; pasadas <= 12; pasadas++) {
    animacionPeachBase.push(loadImage("data/frame" + pasadas + ".png"));
  }
  // bloque 3: animaciones finales de peach
  for (let pasadas = 13; pasadas <= 20; pasadas++) {
    animacionPeachFinal.push(loadImage("data/frame" + pasadas + ".png"));
  }
  // bloque 4: ciclo de caminata inferior
  for (let pasadas = 21; pasadas <= 25; pasadas++) {
    secuenciaCaminata.push(loadImage("data/frame" + pasadas + ".png"));
  }
}
function setup() {
  createCanvas(800, 600);
}
function draw() {
  if (!enPresentacion) {
    mostrarPortadaMenu();
  } else {
    let tiempoRelativo = millis() - marcaTiempo; // tiempo transcurrido
    // control de finalización: detiene la música y vuelve al menú al terminar
    if (tiempoRelativo >= duracionTotalPresentacion) {
      enPresentacion = false;
      if (musicaFondo && musicaFondo.isPlaying()) {
        musicaFondo.stop();
      }
      return;
    }
    // cronología de la animación principal
    // 1. parpadeo inicial de ojos
    if (tiempoRelativo < 3420) {
      mostrarParpadeo(secuenciaOjos, tiempoRelativo, 190, 6);
    }
    // 2. bloque principal de expresiones
    else if (tiempoRelativo < 29420) {
      ejecutarSecuenciaUno(tiempoRelativo - 3420);
    }
    // 3. bloque final de saludos y celebración
    else {
      ejecutarSecuenciaDos(tiempoRelativo - 29420);
    }
    // animación secundaria: peach caminando
    if (tiempoRelativo >= 1500) {
      mostrarCaminanteInferior(tiempoRelativo - 1500, 0.10, 120);
    }
  }
}
//interfaz del menú principal
function mostrarPortadaMenu() {
  imageMode(CORNER);
  image(imgFondoMenu, 0, 0, 800, 600);

  let latidoLogo = 1 + sin(frameCount * 0.05) * 0.05;
  let latidoBoton = 1 + sin(frameCount * 0.05) * 0.05;

  imageMode(CENTER);
  let logoAncho = imgLogoMenu.width * latidoLogo;
  let logoAlto = imgLogoMenu.height * latidoLogo;
  image(imgLogoMenu, 400, 230, logoAncho, logoAlto);

  let bAncho = anchoBoton * latidoBoton;
  let bAlto = altoBoton * latidoBoton;

  rectMode(CENTER);
  stroke(255);
  strokeWeight(2);
  fill(220, 50, 100);
  rect(400, botonY + altoBoton / 2, bAncho, bAlto, 10);

  fill(255);
  noStroke();
  textSize(22 * latidoBoton);
  textAlign(CENTER, CENTER);
  text("INICIAR", 400, botonY + altoBoton / 2);
}
// eventos de interaccion (mouse y teclado)
function mousePressed() {
  if (!enPresentacion) {
    if (mouseX >= botonX && mouseX <= botonX + anchoBoton && mouseY >= botonY && mouseY <= botonY + altoBoton) {
      iniciarSecuencia();
    }
  }
}
function keyPressed() {
  if (key === 'r' || key === 'R') {
    enPresentacion = false;
    if (musicaFondo && musicaFondo.isPlaying()) {
      musicaFondo.stop();
    }
  }
}
function iniciarSecuencia() {
  enPresentacion = true;
  marcaTiempo = millis();
  if (musicaFondo && !musicaFondo.isPlaying()) {
    musicaFondo.loop();
  }
}
// funciones reutilizados y cálculos
function calcularCuadroActual(tiempoTranscurrido, duracionPorCuadro, totalCuadros) {
  return floor(tiempoTranscurrido / duracionPorCuadro) % totalCuadros;
}
function dibujarPersonaje(imagen) {
  let altoFijo = 450;
  let proporcionEscala = imagen.width / imagen.height;
  let anchoAdaptado = altoFijo * proporcionEscala;

  imageMode(CENTER);
  image(imagen, 400, 375, anchoAdaptado, altoFijo);
}
//animaciones de parpadeo de ojos
function mostrarParpadeo(arregloImagenes, tiempoAccion, duracionFrame, limiteVueltas) {
  imageMode(CORNER);
  image(imgFondo1, 0, 0, 800, 600);

  let totalCuadros = arregloImagenes.length;
  let duracionCiclo = totalCuadros * duracionFrame;
  let vueltaActual = floor(tiempoAccion / duracionCiclo);

  let fotogramaActual;
  if (vueltaActual < limiteVueltas) {
    let posicion = calcularCuadroActual(tiempoAccion, duracionFrame, totalCuadros);
    fotogramaActual = arregloImagenes[posicion];
  } else {
    fotogramaActual = arregloImagenes[totalCuadros - 1];
  }
  imageMode(CENTER);
  image(fotogramaActual, 400, 300, 800, 450);
}
function mostrarParpadeoFinalFrame1(arregloImagenes, tiempoAccion, duracionFrame, limiteVueltas) {
  imageMode(CORNER);
  image(imgFondo1, 0, 0, 800, 600);

  let totalCuadros = arregloImagenes.length;
  let duracionCiclo = totalCuadros * duracionFrame;
  let vueltaActual = floor(tiempoAccion / duracionCiclo);

  let fotogramaActual;
  if (vueltaActual < limiteVueltas) {
    let posicion = calcularCuadroActual(tiempoAccion, duracionFrame, totalCuadros);
    fotogramaActual = arregloImagenes[posicion];
  } else {
    fotogramaActual = arregloImagenes[0];
  }
  imageMode(CENTER);
  image(fotogramaActual, 400, 300, 800, 450);
}
// animación de peach caminando
function mostrarCaminanteInferior(tiempoPaso, velocidadDesplazamiento, ritmoFrame) {
  let tamanoAncho = 80;
  let tamanoAlto = 160;

  let posHorizontal = (tiempoPaso * velocidadDesplazamiento) % (width + tamanoAncho) - (tamanoAncho / 2);
  let posVertical = height - (tamanoAlto / 2) - 10;
  let posicionFrame = calcularCuadroActual(tiempoPaso, ritmoFrame, secuenciaCaminata.length);

  imageMode(CENTER);
  image(secuenciaCaminata[posicionFrame], posHorizontal, posVertical, tamanoAncho, tamanoAlto);
}
//controladores de escenas
function ejecutarSecuenciaUno(tiempoRelativo) {
  let duracionParpadeo = 190;
  let repeticionesOjos = 6;
  let tiempoTotalOjos = repeticionesOjos * (3 * duracionParpadeo) + 1000;

  let velocidadSaludoCabeza = 450;
  let repeticionesSaludo = 4;
  let tiempoBloque1 = repeticionesSaludo * (3 * velocidadSaludoCabeza);

  let velocidadGuino = 180;
  let repeticionesGuino = 4;
  let tiempoBloque2 = repeticionesGuino * (3 * velocidadGuino);
  let tiempoBloque3 = 4 * (3 * 200) + 1500;

  let finBloque1 = tiempoBloque1;
  let finOjos1 = finBloque1 + tiempoTotalOjos;
  let finBloque2 = finOjos1 + tiempoBloque2;
  let finOjos2 = finBloque2 + tiempoTotalOjos;

  if ((tiempoRelativo >= finBloque1 && tiempoRelativo < finOjos1) ||
    (tiempoRelativo >= finBloque2 && tiempoRelativo < finOjos2) ||
    (tiempoRelativo >= finOjos2 + tiempoBloque3)) {
    let tiempoOjos = 0;
    if (tiempoRelativo >= finOjos2 + tiempoBloque3) {
      tiempoOjos = tiempoRelativo - (finOjos2 + tiempoBloque3);
    } else if (tiempoRelativo >= finBloque2) {
      tiempoOjos = tiempoRelativo - finBloque2;
    } else {
      tiempoOjos = tiempoRelativo - finBloque1;
    }
    mostrarParpadeo(secuenciaOjos, tiempoOjos, duracionParpadeo, repeticionesOjos);
  } else {
    imageMode(CORNER);
    image(imgFondo2, 0, 0, 800, 600);

    let cuadroVisualizado;
    if (tiempoRelativo < finBloque1) {
      let pos = calcularCuadroActual(tiempoRelativo, velocidadSaludoCabeza, 3);
      cuadroVisualizado = animacionPeachBase[pos];
    } else if (tiempoRelativo < finBloque2) {
      let tiempoOffset = tiempoRelativo - finOjos1;
      let pos = 3 + calcularCuadroActual(tiempoOffset, velocidadGuino, 3);
      cuadroVisualizado = animacionPeachBase[pos];
    } else {
      let tiempoOffset = tiempoRelativo - finOjos2;
      let pos = 6 + calcularCuadroActual(tiempoOffset, 200, 3);
      cuadroVisualizado = animacionPeachBase[pos];
    }
    dibujarPersonaje(cuadroVisualizado);
  }
}
function ejecutarSecuenciaDos(tiempoRelativo) {
  let duracionParpadeo = 190;
  let repeticionesOjos = 6;
  let tiempoTotalOjos = repeticionesOjos * (3 * duracionParpadeo) + 1000;

  let duracionSaludo = 4 * (5 * 200);
  let duracionCelebracion = 4 * (3 * 200);

  let finSaludo = duracionSaludo;
  let finOjos = finSaludo + tiempoTotalOjos;

  if (tiempoRelativo >= finSaludo && tiempoRelativo < finOjos) {
    let tiempoOjos = tiempoRelativo - finSaludo;
    mostrarParpadeo(secuenciaOjos, tiempoOjos, duracionParpadeo, repeticionesOjos);
  } else if (tiempoRelativo >= finOjos + duracionCelebracion) {
    let tiempoOjos = tiempoRelativo - (finOjos + duracionCelebracion);
    mostrarParpadeoFinalFrame1(secuenciaOjos, tiempoOjos, duracionParpadeo, repeticionesOjos);
  } else {
    imageMode(CORNER);
    image(imgFondo3, 0, 0, 800, 600);

    let cuadroSeleccionado;
    if (tiempoRelativo < finSaludo) {
      let pos = calcularCuadroActual(tiempoRelativo, 200, 5);
      cuadroSeleccionado = animacionPeachFinal[pos];
    } else {
      let tiempoOffset = tiempoRelativo - finOjos;
      let pos = 5 + calcularCuadroActual(tiempoOffset, 200, 3);
      cuadroSeleccionado = animacionPeachFinal[pos];
    }
    dibujarPersonaje(cuadroSeleccionado);
  }
}
