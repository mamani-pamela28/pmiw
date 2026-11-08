let musica;

let imgFondoMenu;
let imgLogoMenu;

let imgFondoInstrucciones;
let imgObjeto1;
let imgObjeto2;
let imgObjeto3;
// IMÁGENES DE VICTORIA Y DERROTA
let imgFondoVictoria;
let imgFondoDerrota;

let imgLogoVictoria;
let imgLogoDerota;

let imgPoseVictoria;
let imgPoseDerrota;

let imagenesFinales = [];

let pantalla = 0;

let posicionCreditos = 0;

function preload() {
  // PORTADA
  musica = loadSound("data/musica.mp3");
  imgFondoMenu = loadImage("data/fondo.jpg");
  imgLogoMenu = loadImage("data/logo.png");
  // INSTRUCCIONES
  imgFondoInstrucciones = loadImage("data/fondo1.png");

  imgObjeto1 = loadImage("data/objeto1.png");
  imgObjeto2 = loadImage("data/objeto2.png");
  imgObjeto3 = loadImage("data/objeto3.png");
  // VICTORIA Y DERROTA
  imgFondoVictoria = loadImage("data/fondo2.jpg");
  imgFondoDerrota = loadImage("data/fondo3.jpg");

  imgLogoVictoria = loadImage("data/logoVictoria.png");
  imgLogoDerota = loadImage("data/logoDerrota.png");

  imgPoseVictoria = loadImage("data/Vpose.png");
  imgPoseDerrota = loadImage("data/Dpose.png");
  //PANTALLAS FINALES
  imagenesFinales = [
    imgLogoVictoria,
    imgLogoDerota,
    imgPoseVictoria,
    imgPoseDerrota
  ];
}
function setup() {
  createCanvas(800, 400);
}
function draw() {
  if (pantalla == 0) {
    mostrarPortadaMenu();
  }
  if (pantalla == 1) {
    mostrarInstrucciones();
  }
  if (pantalla == 2) {
    mostrarCreditos();
  }
  if (pantalla == 3) {
    background(30, 35, 65);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("PARTIDA", 400, 200);
  }
  if (pantalla == 4) {
    mostrarVictoria();
  }
  if (pantalla == 5) {
    mostrarDerrota();
  }
}
// PORTADA
function mostrarPortadaMenu() {
  imageMode(CORNER);
  image(imgFondoMenu, 0, 0, 800, 400);

  let latido = 1 + sin(frameCount * 0.05) * 0.05;

  imageMode(CENTER);

  let logoAncho = imgLogoMenu.width * 0.75 * latido;
  let logoAlto = imgLogoMenu.height * 0.75 * latido;

  image(imgLogoMenu, 400, 165, logoAncho, logoAlto);

  let anchoBoton = 180 * latido;
  let altoBoton = 55 * latido;

  rectMode(CENTER);

  stroke(255);
  strokeWeight(2);

  fill(220, 50, 100);
  rect(290, 320, anchoBoton, altoBoton, 10);
  rect(510, 320, anchoBoton, altoBoton, 10);

  fill(255);
  noStroke();

  textSize(22 * latido);
  textAlign(CENTER, CENTER);

  text("INICIO", 290, 320);
  text("CRÉDITOS", 510, 320);
}
function mostrarInstrucciones() {
  imageMode(CORNER);
  image(imgFondoInstrucciones, 0, 0, 800, 400);

  fill(0);
  textAlign(CENTER, CENTER);

  textSize(30);
  text("¿CÓMO JUGAR?", 400, 35);

  textSize(20);
  text("UNA CARRERA CONTRA EL TIEMPO", 400, 72);

  textSize(18);
  text("CONTROLES", 400, 115);

  textSize(18);
  text("↑", 300, 150);
  text("SALTAR", 300, 177);

  textSize(18);
  text("→", 500, 150);
  text("AVANZAR", 500, 177);

  textSize(18);
  text("OBJETIVO", 400, 215);

  textSize(18);
  text("Recolectá los tres objetos y llegá a la meta.", 400, 240);

  imageMode(CENTER);

  image(imgObjeto1, 300, 280, 50, 50);
  image(imgObjeto2, 400, 280, 50, 50);
  image(imgObjeto3, 500, 280, 50, 50);

  fill(0);
  textSize(18);
  text("TIEMPO LÍMITE: 2 MINUTOS", 400, 320);

  dibujarBotonesInstrucciones();
}
function dibujarBotonesInstrucciones() {
  rectMode(CENTER);
  stroke(255);
  strokeWeight(2);

  fill(220, 50, 100);
  rect(250, 365, 200, 45, 10);

  fill(50, 150, 100);
  rect(550, 365, 200, 45, 10);

  fill(255);
  noStroke();

  textAlign(CENTER, CENTER);
  textSize(16);

  text("VOLVER AL MENÚ", 250, 365);
  text("¡A JUGAR!", 550, 365);
}
function mostrarCreditos() {
  background(0);

  if (posicionCreditos < 850) {
    posicionCreditos += 0.5;
  }
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);

  textSize(30);
  text("CRÉDITOS", 400, 450 - posicionCreditos);

  textSize(22);
  text("Desarrollo", 400, 520 - posicionCreditos);

  textSize(18);
  text("Mamani Pamela y Azul Ojeda", 400, 560 - posicionCreditos);

  textSize(22);
  text("Historia y Adaptación", 400, 640 - posicionCreditos);

  textSize(18);
  text("Syundei (Mamani Pamela)", 400, 680 - posicionCreditos);

  textSize(22);
  text("Arte y personajes", 400, 760 - posicionCreditos);

  textSize(18);
  text("Mamani Pamela y Azul Ojeda", 400, 800 - posicionCreditos);

  textSize(22);
  text("Música", 400, 880 - posicionCreditos);

  textSize(18);
  text("One Piece - Nami's Theme", 400, 920 - posicionCreditos);

  textSize(24);
  text("¡Gracias por jugar!", 400, 1050 - posicionCreditos);

  dibujarBotonVolver();
}
function dibujarBotonVolver() {
  rectMode(CENTER);

  fill(220, 50, 100);
  stroke(255);
  strokeWeight(2);

  rect(400, 365, 180, 45, 10);

  fill(255);
  noStroke();

  textSize(16);
  textAlign(CENTER, CENTER);

  text("VOLVER AL MENÚ", 400, 365);
}
// PANTALLA DE VICTORIA
function mostrarVictoria() {
  imageMode(CORNER);
  image(imgFondoVictoria, 0, 0, 800, 400);

  let latido = 1 + sin(frameCount * 0.05) * 0.05;

  imageMode(CENTER);

  // LOGO DE VICTORIA
  image(imagenesFinales[0], 400, 100,
    imagenesFinales[0].width * 0.55 * latido,
    imagenesFinales[0].height * 0.55 * latido);

  // POSE DE NAKAMURA
  image(imagenesFinales[2], 400, 220,
    imagenesFinales[2].width * 0.3,
    imagenesFinales[2].height * 0.3);

  dibujarBotonesFinales();
}
// PANTALLA DE DERROTA
function mostrarDerrota() {
  imageMode(CORNER);
  image(imgFondoDerrota, 0, 0, 800, 400);

  let latido = 1 + sin(frameCount * 0.05) * 0.05;

  imageMode(CENTER);
  // LOGO DE DERROTA
  image(imagenesFinales[1], 400, 100,
    imagenesFinales[1].width * 0.55 * latido,
    imagenesFinales[1].height * 0.55 * latido);
  // POSE DE NAKAMURA
  image(imagenesFinales[3], 400, 220,
    imagenesFinales[3].width * 0.3,
    imagenesFinales[3].height * 0.3);

  dibujarBotonesFinales();
}
// BOTONES DE VICTORIA Y DERROTA
function dibujarBotonesFinales() {
  rectMode(CENTER);

  stroke(255);
  strokeWeight(2);

  fill(220, 50, 100);
  rect(290, 365, 180, 45, 10);

  fill(50, 150, 100);
  rect(550, 365, 200, 45, 10);

  fill(255);
  noStroke();

  textAlign(CENTER, CENTER);
  textSize(16);

  text("REINTENTAR", 290, 365);
  text("VOLVER AL MENÚ", 550, 365);
}
// INTERACCIONES CON EL MOUSE
function mousePressed() {
  if (pantalla == 0) {
    if (mouseX > 200 && mouseX < 380 &&
        mouseY > 292 && mouseY < 348) {

      pantalla = 1;
    }
    else if (mouseX > 420 && mouseX < 600 &&
             mouseY > 292 && mouseY < 348) {
      pantalla = 2;
      posicionCreditos = 0;
    }
  }
  else if (pantalla == 1) {
    // VOLVER AL MENÚ
    if (mouseX > 150 && mouseX < 350 &&
        mouseY > 342 && mouseY < 388) {

      pantalla = 0;
    }
    // INICIAR JUEGO
    else if (mouseX > 450 && mouseX < 650 &&
             mouseY > 342 && mouseY < 388) {

      pantalla = 3;
    }
  }
  // CRÉDITOS
  else if (pantalla == 2) {
    if (mouseX > 310 && mouseX < 490 &&
        mouseY > 342 && mouseY < 388) {

      pantalla = 0;
    }
  }
  // VICTORIA Y DERROTA
  else if (pantalla == 4 || pantalla == 5) {

    // REINTENTAR
    if (mouseX > 200 && mouseX < 380 &&
        mouseY > 342 && mouseY < 388) {

      pantalla = 3;
    }
    // VOLVER AL MENÚ
    else if (mouseX > 450 && mouseX < 650 &&
             mouseY > 342 && mouseY < 388) {

      pantalla = 0;
    }
  }
}
// TECLAS PARA PROBAR LAS PANTALLAS DE VICTORIA Y DE DRRROTA (DESPUES CUANTO ESTE COMPLETO EL JUEGO SE QUITA ESTOS BOTONES)
function keyPressed() {
  if (key == 'v' || key == 'V') {
    pantalla = 4;
  }
  if (key == 'd' || key == 'D') {
    pantalla = 5;
  }
}
