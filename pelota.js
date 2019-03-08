let rngNum = new RNG_comix(Date.now(), 1664525, 1013904223, Math.pow(2, 32));
let rngUnif = new RNG_comix01(Date.now(), 1664525, 1013904223, 32);

class Pelota {
    constructor(e, dia) {
        this.elem = e;
        this.diametro = dia;
        this.factorReb = this.accY = this.x = this.y = this.velX = this.velY = 0;
        e.style.width = e.style.height = `${dia}px`;
    }
    getY() {
        return this.y;
    }
    setY(y) {
        this.y = y;
        return this.elem.style.bottom = `${Math.round(y)}px`;
    }
    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
        return this.elem.style.left = `${Math.round(x)}px`;
    }
    setDiam(x) {
        this.diametro = x;
        this.elem.style.width = this.elem.style.height = `${x}px`;
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

class ConfigPelota {
    constructor(diam, reb) {
        this.diam = diam;
        this.reb = reb;
    }
}

const listaP = document.getElementById('listaPels')
const pelota = new Pelota(document.querySelector('#pelota'), 30);
const inGrav = document.getElementById('inGrav');
const inReb = document.getElementById('inReb');
const inVel = document.getElementById('inVel');
var temporizador = null;
nomsPels = ["futbol", "baloncesto", "beisbol", "tenis", "mesa"]
configs = {
    "futbol" : new ConfigPelota(30, 0.7),
    "baloncesto" : new ConfigPelota(40, 0.9),
    "beisbol" : new ConfigPelota(15, 0.3),
    "tenis" : new ConfigPelota(10, 0.6),
    "mesa" : new ConfigPelota(10, 0.4)
};

function tiempo() {
    pelota.move();
}

function setCamposActivados(stat) {
    document.querySelectorAll('.campo').forEach(x => x.disabled = !stat);
}

function iniciar() {
    parar();
    pelota.reset();
    pelota.accY = -parseFloat(inGrav.value) / 100;
    pelota.factorReb = parseFloat(inReb.value);
    pelota.velX = parseFloat(inVel.value) / 100;
    temporizador = setInterval(tiempo, 10);
    setCamposActivados(false);
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
    setCamposActivados(true);
}

function cambia(src){
    pelota.elem.src=`img/${src}.png`;
    listaP.value = src;
    cfg = configs[src];
    pelota.setDiam(cfg['diam']);
    inReb.value = cfg['reb'];
    pelota.reset();
}

function updateInput(id, val) {
    document.querySelector(`#${id}`).value = val;
}

document.querySelector('#botIniciar').addEventListener('click', iniciar);
document.querySelector('#botParar').addEventListener('click', parar);
document.querySelector('#botPausar').addEventListener('click', pausar);

cambia(nomsPels[rngNum.random()%5]);
