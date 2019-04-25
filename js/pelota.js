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

