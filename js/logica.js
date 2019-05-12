class ConfigPelota {
    constructor(diam, reb) {
        this.diam = diam;
        this.reb = reb;
    }
}

const docMain = document.querySelector('main');
const divsDist = docMain.getElementsByClassName('dist');
var pelotas = [];
var temporizador = null;
var distrFuerzas = generaDistrNorm(300, 150);
var distrPelotas = generaDistrPoisson(6);
var genFunc = null;
const inNormLambda = document.getElementById('inNormLambda');
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
        p.velX = Math.max(0, randomDistr(distrFuerzas)) / 100;
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
    console.log('creando: ' + n);
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

function creaPelotasRandom() {
    creaPelotas(Math.max(0, Math.round(randomDistr(distrPelotas))));
}

function cargaVars() {
    distrPelotas = null;
    var arr = []
    var cl = divsDist;
    var divo;
    for(var i=0; i<cl.length; i++) {
        if(cl[i].style.display == 'block') {
            divo = cl[i];
            break;
        }
    }
    var inElems = divo.getElementsByTagName('input');
    for(var i=0; i<inElems.length; i++) {
        arr.push(parseFloat(inElems[i].value));
    }
    distrPelotas = genFunc.apply(null, arr);
    creaPelotasRandom();
}

function muestraDistrs(mstr, funco) {
    var cl = divsDist;
    genFunc = funco;
    for(var i=0; i<cl.length; i++) {
        cl[i].style.display = cl[i].id==mstr? 'block' : 'none';
    }
    cargaVars();
}


document.querySelector('#botIniciar').addEventListener('click', iniciar);
document.querySelector('#botParar').addEventListener('click', parar);
document.querySelector('#botPausar').addEventListener('click', pausar);
document.querySelector('#botGenera').addEventListener('click', cargaVars);

muestraDistrs('normalDiv', generaDistrNorm);
creaPelotasRandom();
