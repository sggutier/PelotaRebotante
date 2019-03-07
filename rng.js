class RNG_comix {
    constructor(x0, a, c, m, fin=null) {
        this.x = x0;
        this.a = a;
        this.c = c;
        if(fin==null) {
            this.m = m;
            this.ini = 0;
        }
        else {
            this.m = fin-m;
            this.ini = m;
        }
    }
    random() {
        let ans = this.x;
        this.x = (this.x * this.a + this.c) % this.m;
        return ans;
    }
    generaNRandom(n) {
        let w = []
        for(let i=0; i<n; i++)
            w.push(this.random());
        return w;
    }
}

class RNG_comix01 {
    constructor(x0, a, c, n) {
        this.rng = new RNG_comix(x0, a, c, Math.pow(2, n) );
        this.n = n;
    }
    random() {
        let ans = 0;
        let uwu = this.rng.random();
        for(let i=0, pt=1/2; i<this.n; i++, pt/=2) {
            if((1<<(this.n-1-i)) & uwu)
                ans += pt;
        }
        return ans;
    }
    generaNRandom(n) {
        let w = []
        for(let i=0; i<n; i++)
            w.push(this.random());
        return w;
    }
}

var rng = new RNG_comix(4, 5, 7, 8);
var ro = new RNG_comix(4, 137, 7, 1024, 2048);


// for(let i=0, pv = rng.random(); i<8; i++) {
//     let w = rng.random();
//     console.log({n: i, x_n: pv, x_np1: w});
//     pv = w;
// }

// for(let i=0, pv = ro.random(); i<8; i++) {
//     let w = ro.random();
//     console.log({n: i, x_n: pv, x_np1: w});
//     pv = w;
// }

let wo = new RNG_comix01(0, 1664525, 1013904223, 32);
// for(let i=0, pv = wo.random(); i<8; i++) {
//     let w = wo.random();
//     console.log({n: i, x_n: pv, x_np1: w});
//     pv = w;
// }
