let imgFondoMenu;
let imgLogoMenu;

let secuenciaPantalla1 = [];

let pantalla = 0;
let tiempoInicioPantalla1 = 0;

function preload() {
  imgFondoMenu = loadImage("data/fondo.jpg");
  imgLogoMenu = loadImage("data/logo.png");

  secuenciaPantalla1[0] = loadImage("data/escenario1.png");
  secuenciaPantalla1[1] = loadImage("data/frame1.png");
  secuenciaPantalla1[2] = loadImage("data/frame2.png");
  secuenciaPantalla1[3] = loadImage("data/escritorio.png");

  // Ventana de pensamiento 
  secuenciaPantalla1[4] = loadImage("data/ventanaPensamiento.png");

  secuenciaPantalla1[5] = loadImage("data/frame3.png");
  secuenciaPantalla1[6] = loadImage("data/frame4.png");
  secuenciaPantalla1[7] = loadImage("data/frame5.png");
  secuenciaPantalla1[8] = loadImage("data/frame6.png");

  // Escenario 2
  secuenciaPantalla1[9] = loadImage("data/escenario2.png");

  // Frames en los que Nakamura habla
  secuenciaPantalla1[10] = loadImage("data/frame7.png");
  secuenciaPantalla1[11] = loadImage("data/frame8.png");

  // Ventana de diálogo 
  secuenciaPantalla1[12] = loadImage("data/ventanaDialogo.png");
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  if (pantalla == 0) {
    mostrarPortadaMenu();
  }
  else if (pantalla == 1) {
    mostrarPantallaUno();
  }
}

function mostrarPortadaMenu() {
  imageMode(CORNER);
  image(imgFondoMenu, 0, 0, 800, 450);

  let latido = 1 + sin(frameCount * 0.05) * 0.05;

  imageMode(CENTER);

  let logoAncho = imgLogoMenu.width * 0.75 * latido;
  let logoAlto = imgLogoMenu.height * 0.75 * latido;

  image(imgLogoMenu, 400, 200, logoAncho, logoAlto);

  let anchoBoton = 180 * latido;
  let altoBoton = 55 * latido;

  rectMode(CENTER);

  stroke(255);
  strokeWeight(2);

  fill(220, 50, 100);
  rect(290, 350, anchoBoton, altoBoton, 10);

  rect(510, 350, anchoBoton, altoBoton, 10);

  fill(255);
  noStroke();

  textSize(22 * latido);
  textAlign(CENTER, CENTER);

  text("INICIO", 290, 350);
  text("CRÉDITOS", 510, 350);
}

function mostrarPantallaUno() {
  let tiempo = millis() - tiempoInicioPantalla1;

  imageMode(CORNER);

  // ESCENARIO INICIAL
  if (tiempo < 2000) {
    image(secuenciaPantalla1[0], 0, 0, 800, 450);
  }

  // PARPADEO
  else if (tiempo < 5600) {
    let tiempoParpadeo = tiempo - 2000;
    let parpadeo = floor(tiempoParpadeo / 300);

    if (parpadeo % 2 == 0) {
      // ESCENARIO 2 + FRAME 1
      image(secuenciaPantalla1[9], 0, 0, 800, 450);
      image(secuenciaPantalla1[1], 0, 0, 800, 450);
    }
    else {
      // FRAME 2
      image(secuenciaPantalla1[2], 0, 0, 800, 450);
    }
  }

  // ESCRITORIO  MAS  DIÁLOGO
  else if (tiempo < 14600) {
    image(secuenciaPantalla1[3], 0, 0, 800, 450);
    mostrarDialogo();
  }

  // MUECAS Y DIÁLOGO
  else {
    let tiempoMuecas = tiempo - 14600;
    let frameMueca = floor(tiempoMuecas / 600);

    // ESCENARIO 2 COMO FONDO
    image(secuenciaPantalla1[9], 0, 0, 800, 450);

    // FRAME 3 Y 4
    if (frameMueca < 4) {
      if (frameMueca % 2 == 0) {
        image(secuenciaPantalla1[5], 0, 0, 800, 450);
      }
      else {
        image(secuenciaPantalla1[6], 0, 0, 800, 450);
      }
    }

    // FRAME 5 Y 6
    else if (frameMueca < 8) {
      if (frameMueca % 2 == 0) {
        image(secuenciaPantalla1[7], 0, 0, 800, 450);
      }
      else {
        image(secuenciaPantalla1[8], 0, 0, 800, 450);
      }
    }

    // FRAME 7 Y 8: SE REPITEN HASTA PRESIONAR EL BOTÓN
    else {
      if (frameMueca % 2 == 0) {
        image(secuenciaPantalla1[10], 0, 0, 800, 450);
      }
      else {
        image(secuenciaPantalla1[11], 0, 0, 800, 450);
      }

      mostrarDialogoNuevo();

      // BOTÓN SALIR DE CASA
      rectMode(CENTER);

      stroke(255);
      strokeWeight(2);

      fill(220, 50, 100);
      rect(650, 285, 200, 45, 10);

      fill(255);
      noStroke();

      textSize(18);
      textAlign(CENTER, CENTER);
      text("Salir de casa", 650, 285);
    }
  }
}

function mostrarDialogo() {
  let tiempoDialogo = millis() - tiempoInicioPantalla1 - 5600;

  // VENTANA DE PENSAMIENTO
  image(secuenciaPantalla1[4], 0, 330, 790, 120);

  fill(24, 36, 95);
  noStroke();

  textAlign(LEFT, TOP);

  // FRASE 1
  if (tiempoDialogo < 2000) {
    textSize(24);
    text("Nakamura", 80, 340);

    textSize(20);
    text("Hoy se lo voy a decir...", 40, 385);
  }

  // FRASE 2
  else if (tiempoDialogo < 6000) {
    textSize(24);
    text("Nakamura", 80, 340);

    textSize(20);
    text("Voy a invitar a Hirose a salir", 40, 382);
    text("Quiero que podamos pasar más tiempo", 40, 402);
    text("juntos y conocernos mejor.", 40, 422);
  }

  // FRASE 3
  else if (tiempoDialogo < 9000) {
    textSize(24);
    text("Nakamura", 80, 340);

    textSize(20);
    text("Esta es mi oportunidad", 40, 382);
    text("Solo tengo que actuar con normalidad.", 40, 402);
  }
}

function mostrarDialogoNuevo() {
  let tiempoDialogo = millis() - tiempoInicioPantalla1 - 19400;

  // / VENTANA DE DIALOGO
  image(secuenciaPantalla1[12], 0, 330, 790, 120);

  fill(24, 36, 95);
  noStroke();

  textAlign(LEFT, TOP);

  // FRASE 1
  if (tiempoDialogo < 2400) {
    textSize(24);
    text("Nakamura", 80, 340);

    textSize(20);
    text("¿Por qué parezco un delincuente a punto", 40, 382);
    text("de cometer un crimen?", 40, 405);
  }

  // FRASE 2
  else if (tiempoDialogo < 4800) {
    textSize(24);
    text("Nakamura", 80, 340);

    textSize(20);
    text("¡No importa! ¡Hoy va a salir bien!", 40, 390);
  }
}

function mousePressed() {
  // BOTÓN INICIO DEL MENÚ
  if (pantalla == 0 &&
      mouseX > 200 &&
      mouseX < 380 &&
      mouseY > 320 &&
      mouseY < 380) {

    pantalla = 1;
    tiempoInicioPantalla1 = millis();
  }

  // BOTÓN SALIR DE CASA
  if (pantalla == 1) {
    let tiempo = millis() - tiempoInicioPantalla1;

    if (tiempo >= 19400 &&
        mouseX > 550 &&
        mouseX < 750 &&
        mouseY > 262 &&
        mouseY < 308) {
      pantalla = 2;
    }
  }
}
