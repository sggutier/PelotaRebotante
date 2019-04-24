let rngNum = new RNG_comix(Date.now(), 1664525, 1013904223, Math.pow(2, 32));
let rngUnif = new RNG_comix01(Date.now(), 1664525, 1013904223, 32);

class Pelota {
    constructor(e, dia=30) {
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

const docMain = document.querySelector('main');
const numPs = rngNum.random()%10 + 1;
var pelotas = [];
var temporizador = null;
nomsPels = ["futbol", "baloncesto", "beisbol", "tenis", "mesa"]
configs = {
    "futbol" : new ConfigPelota(40, 0.6),
    "baloncesto" : new ConfigPelota(45, 0.75),
    "beisbol" : new ConfigPelota(20, 0.3),
    "tenis" : new ConfigPelota(25, 0.9),
    "mesa" : new ConfigPelota(10, 0.8)
};

function tiempo() {
    pelotas.forEach(p => p.move());
}

function setCamposActivados(stat) {
    document.querySelectorAll('.campo').forEach(x => x.disabled = !stat);
}

function iniciar() {
    parar();
    pelotas.forEach(p => {
        p.reset();
        p.accY = -9.8 / 100;
        p.velX = (rngUnif.random()*400 + 100) / 100;
    });
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
    pelotas.forEach(p => p.reset());
    setCamposActivados(true);
}

function cambia(pelota, src){
    pelota.elem.src=`img/${src}.png`;
    cfg = configs[src];
    pelota.setDiam(cfg['diam']);
    pelota.factorReb = cfg['reb'];
    pelota.reset();
}

function updateInput(id, val) {
    document.querySelector(`#${id}`).value = val;
}

function creaPelotas(n) {
    pelotas.forEach(p => docMain.removeChild(p.elem));
    pelotas = [];
    parar();
    for(let i=0; i<n; i++) {
        let p = document.createElement('img');
        p.classList.add('pelota')
        docMain.append(p);
        pelotas.push(new Pelota(p));
    }
    pelotas.forEach(p => cambia(p, nomsPels[rngNum.random()%5]));
}

document.querySelector('#botIniciar').addEventListener('click', iniciar);
document.querySelector('#botParar').addEventListener('click', parar);
document.querySelector('#botPausar').addEventListener('click', pausar);

creaPelotas(numPs);

