
// Definindo variáveis globais
let jardineiro;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;

function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width/2, height-50);
}

function draw() {
  // Usando map() para ajustar cor de fundo de forma mais controlada;
  let corFundo = lerpColor(
    color(217, 112, 26),
    color(219, 239, 208),
    map(totalArvores, 0, 100, 0, 1)
  );
  background(corFundo);
  mostrarInformacoes();
  temperatura += 0.1;
  // Atualizar posição do jardineiro
  jardineiro.atualizar();
  // Mostrar o jardineiro
  jardineiro.mostrar();

  // Verificar se o jogo acabou
  verificarFimDeJogo();

  // Mostrar árvores
  plantas.forEach(arvore => arvore.mostrar());
}

// Função para mostrar as informações na tela
function mostrarInformacoes() {
  textSize(26);
  fill(0);
  text("Vamos plantar árvores para reduzir a temperatura?", 10, 30);
  textSize(14);
  fill('white');
  text("Temperatura: " + temperatura.toFixed(2), 10, 390);
  text("Árvores plantadas: " + totalArvores, 460, 390);
  text("Para movimentar o personagem use as setas do teclado.", 10, 60);
  text("Para plantar árvores use P ou espaço.", 10, 80);
}

// Função para verificar se o jogo acabou
function verificarFimDeJogo() {
  if (totalArvores > temperatura) {
    mostrarMensagemDeVitoria();
    noLoop(); // Para parar o draw
  } else if (temperatura > 50) {
    mostrarMensagemDeDerrota();
    noLoop(); // Para parar o draw
  }
}

// Função para mostrar mensagem de vitória
function mostrarMensagemDeVitoria() {
  fill(0, 255, 0, 150);
  rect(50, height/2 - 50, width - 100, 100);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Parabéns! Você reduziu a temperatura!", width/2, height/2);
}

// Função para mostrar mensagem de derrota
function mostrarMensagemDeDerrota() {
  fill(255, 0, 0, 150);
  rect(50, height/2 - 50, width - 100, 100);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("A temperatura ficou muito alta. Tente novamente!", width/2, height/2);
}

// Classe do Jardineiro
class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidade = 5;
    this.tamanho = 20;
  }

  atualizar() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidade;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidade;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.velocidade;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.velocidade;
    }
    // Limitar dentro da tela
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  mostrar() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.tamanho);
  }
}

// Classe da Árvore
class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 15;
  }

  mostrar() {
    fill(34, 139, 34);
    rect(this.x, this.y - this.tamanho, 5, this.tamanho);
    fill(0, 100, 0);
    ellipse(this.x + 2.5, this.y - this.tamanho, 15, 15);
  }
}

// Evento para plantar árvore com tecla
function keyPressed() {
  if (key === ' ' || key === 'p' || key === 'P') {
    let arvore = new Arvore(jardineiro.x, jardineiro.y);
    plantas.push(arvore);
    totalArvores++;
    temperatura -= 3;
    if (temperatura < 0) {
      temperatura = 0;
    }
  }
}