class Droste {
    constructor(x, y, z, t){
        this._x = x;
        this._y = y;
        this._z = z;
        this._t = t;
        this._subArray = [this._x, this._y, this._z, this._t];
        this._mainArray = [];
        this._volArray = [];
        this._scaleInverse = null;
        this._integral = null;
    }

    start() {
        this._mainArray.push(this._subArray);
    }

    _scale(k) {
        let subArray = [];
        const x = this._mainArray[this._mainArray.length - 1][0] / k;
        subArray.push(x);
        const y = this._mainArray[this._mainArray.length - 1][1] / k;
        subArray.push(y);
        const z = this._mainArray[this._mainArray.length - 1][2] / k;
        subArray.push(z);
        const t = this._mainArray[this._mainArray.length - 1][3] / k;
        subArray.push(t);
        this._mainArray.push(subArray);
        return this._mainArray;
    }

    _volume(k) {
        let iterator = this._scale(k).values();
        const product = (a, b) => a * b;
        for (let sub of iterator) {
            let vol = sub.reduce(product);
            this._volArray.push(vol);
        };
        return this._volArray;
    }

    _integrate(k) {
        this._scaleInverse = k;
        const sum = (a, b) => a + b;
        this._integral = this._volume(k).reduce(sum);
        return this._integral;
    }

/*
    // k is a scale-down factor, therefore k > 1 in most cases.
    // THIS FN CREATES AN INFINITE LOOP
    // BECAUSE _volume(k) APPROACHES ZERO INFINITELY.

    effect(k) {
        do {
            this._integrate(k)
        } while (this._volume(k) !== 0);
        return console.log(this._integrate(k));
    }

    // Use the effect(k) function below instead.
*/
    
    // This fn returns an approximation of the integral
    // based on a finite number of _scale(k) functions.
    // The greater the value of i, the closer the
    // aproximation of the integral is to the actual integral.
    
    effect(k) {
        let i = 0;
        do {
            i += 1
            this._integrate(k)
        } while (i < 10);
        return this._integrate(k);
    }

    logAllData() {
        console.log(this);
    }

    logResults() {
        console.log(`Integral ~= ${this._integral}`);
        console.log(`Down-scale factor = ${this._scaleInverse}`);
    }
}

const droste = new Droste(10, 10, 10, 10);

droste.start();

// Run the file in terminal using: node ~/path/to/file/droste.js
// Example log query below. 

console.log(" ");

droste.effect(9);
droste.logResults();

console.log(" ");

droste.effect(7);
droste.logResults();

console.log(" ");

droste.effect(5);
droste.logResults();

console.log(" ");

droste.effect(3);
droste.logResults();

console.log(" ");

droste.effect(1);
droste.logResults();

console.log(" ");