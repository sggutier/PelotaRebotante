class Pelota {
    constructor(e, dia) {
        this.elem = e;
        this.diametro = dia;
        this.velX = 0;
        this.velY = 0;
        this.accY = 0;
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
        this.setX(this.getX() + this.velX);
        this.setY(this.getY() + this.velY);
    }
}

const pelota = new Pelota(document.querySelector('#pelota'), 30);

function tiempo() {    
    po.move();
} 

// po.velX = 0.5;
// po.accY = -.098 / 2;

var temporizador = null;

function iniciar() {
    setInterval(tiempo, 10);
}


