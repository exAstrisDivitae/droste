class Droste {
    // To create a one-, two-, or three- dimesnsional function,
    // enter falsy value of null or 0 for all unnecessary variables,
    // so that unnecessary variables will be disregarded by the program.
    constructor(x, y, z, t){
        this._x = x;
        this._y = y;
        this._z = z;
        this._t = t;
        this._startArray = [];
        this._mainArray = [];
        this._volArray = [];
        this._scaleInverse = null;
        this._totalValue = null;
    }

    start() {
        if (this._x) {
            this._startArray.push(this._x)
        } else (this._x = null);
        if (this._y) {
            this._startArray.push(this._y)
        } else (this._y = null);
        if (this._z) {
            this._startArray.push(this._z)
        } else (this._z = null);
        if (this._t) {
            this._startArray.push(this._t)
        } else (this._t = null);
        this._mainArray.push(this._startArray);
    }

    _scale(k) {
        let subArray = [];
        if (this._x) {
            const x = this._mainArray[this._mainArray.length - 1][0] / k;
            subArray.push(x);
        } else (this._x = null);
        if (this._y) {
            const y = this._mainArray[this._mainArray.length - 1][1] / k;
            subArray.push(y);
        } else (this._y = null);
        if (this._z) { 
            const z = this._mainArray[this._mainArray.length - 1][2] / k;
            subArray.push(z);
        } else (this._z = null);
        if (this._t) {
            const t = this._mainArray[this._mainArray.length - 1][3] / k;
            subArray.push(t);
        } else (this._t = null);
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

    _total(k) {
        this._scaleInverse = k;
        const sum = (a, b) => a + b;
        this._totalValue = this._volume(k).reduce(sum);
        return this._totalValue;
    }

/*
    // k is a scale-down factor, therefore k > 1 in most cases.
    // THIS FN CREATES AN INFINITE LOOP
    // BECAUSE _volume(k) APPROACHES ZERO INFINITELY.

    effect(k) {
        do {
            this._total(k)
        } while (this._volume(k) !== 0);
        return console.log(this._total(k));
    }

    // Use the effect(k) function below instead.
*/
    
    // This fn returns a sum of all volumes in the sequence,
    // based on a finite number of scaling iterations.
    
    effect(k) {
        let i = 0;
        do {
            i += 1
            this._total(k)
        } while (i < 10);
        return this._total(k);
    }

    logAllData() {
        console.log(this);
    }

    logResults() {
        console.log(`Total value = ${this._totalValue}`);
        console.log(`Down-scale factor = ${this._scaleInverse}`);
    }
}

// e.g.
const droste = new Droste(10, 10, 10, null);

droste.start();

// Run the file in terminal using: node ~/path/to/file/droste.js
// Example log query follows. 
console.log(" ");

droste.effect(0.1);
droste.logResults();

console.log(" ");

droste.effect(0.01);
droste.logResults();

console.log(" ");

droste.effect(0);
droste.logResults();

console.log(" ");

droste.effect(-0.1);
droste.logResults();

console.log(" ");

droste.effect(-0.01);
droste.logResults();

console.log(" ");

// Why are too many subArrays are being added to droste._volArray?
// droste.logAllData();

// console.log(" ");

// End of example log query
