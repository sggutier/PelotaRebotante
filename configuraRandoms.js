let rngNum = new RNG_comix(Date.now(), 1664525, 1013904223, Math.pow(2, 32));
let rngUnif = new RNG_comix01(Date.now(), 1664525, 1013904223, 32);

function randomDistr(finv) {
    return finv(rngUnif.random());
}

function generaDistrNorm(mu, lam) {
    return x => stdlib.base.dists.normal.quantile(x, mu, lam);
}

function generaDistrPoisson(lam) {
    return x => stdlib.base.dists.poisson.quantile(x, lam);
}
