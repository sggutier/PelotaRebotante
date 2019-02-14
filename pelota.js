class Pelota {
    constructor(e, dia) {
        this.elem = e;
        this.diametro = dia;
        this.velX = 0;
        this.velY = 0;
        this.accY = 0;
        this.factorReb = 0;
        e.style.width = e.style.height = `${dia}px`;
    }
    getY() {
        return window.innerHeight - this.elem.offsetTop - this.diametro;
    }
    setY(y) {
        return this.elem.style.bottom = `${y}px`;
    }
    getX() {
        return this.elem.offsetLeft;
    }
    setX(x) {
        return this.elem.style.left = `${x}px`;
    }
    move() {
        this.velY += this.accY;
        let novY = this.getY() + this.velY;
        let novX = this.getX() + this.velX;
        this.setX(Math.min(novX, window.innerWidth - this.diametro));
        if(Math.floor(novY) > 0)
            this.setY(this.getY() + this.velY);
        else {
            this.setY(Math.abs(novY));
            this.velY *= -this.factorReb;
        }
    }
    reset() {
        this.factorReb = 0.85;
        this.velX = 0.5;
        this.accY = -.098 / 2;
        this.velY = 0;
        this.setX(0);
        this.setY(window.innerHeight - this.diametro);
    }
}

const pelota = new Pelota(document.querySelector('#pelota'), 30);

function tiempo() {
    pelota.move();
}

var temporizador = null;

function iniciar() {
    parar();
    pelota.reset();
    pelota.accY = -parseFloat(document.querySelector('#inGrav').value) / 100;
    pelota.factorReb = parseFloat(document.querySelector('#inReb').value);
    pelota.velX = parseFloat(document.querySelector('#inVel').value) / 100;
    temporizador = setInterval(tiempo, 10);
}

function pausar() {
    if(temporizador) {
        clearInterval(temporizador);
        temporizador = null;
    }
    else {
        temporizador = setInterval(tiempo, 10);
    }
}

function parar() {
    clearInterval(temporizador);
    pelota.reset();
}

function cambia(src){
 document.getElementById("pelota").src=src
}

function updateTextInputGrav(val) {
  document.getElementById('inGrav').value=val;
}

function updateTextInputReb(val) {
  document.getElementById('inReb').value=val;
}

function updateTextInputVel(val) {
  document.getElementById('inVel').value=val;
}

document.querySelector('#botIniciar').addEventListener('click', iniciar);
document.querySelector('#botParar').addEventListener('click', parar);
document.querySelector('#botPausar').addEventListener('click', pausar);
