class Car {
    constructor(type, year, door, chair, power, engine, warranty, tyre) {
        this.type = type;
        this.year = year;
        this.door = door;
        this.chair = chair;
        this.power = power;
        this.engine = engine;
        this.warranty = warranty;
        this.tyre = tyre;
    }

    expireGuarantee(currentYear) {
        if (currentYear - this.guarantee <= this.year) {
            console.log("Garansi masih berlaku");
        } else {
            console.log("Garansi habis");
        }
    }
}

class Tyre {
    constructor(merk, qty) {
        this.merk = merk;
        this.qty = qty;
    }
}

class Mobilio extends Car {
    constructor(year) {
        super('MPV', year, 4, 6, '1496 cc', '116 hp', 3, new Tyre('Bridgestone', 4));
    }
}

class Civic extends Car {
    constructor(year) {
        super('Sedan', year, 4, 5, '1498 cc', '171 hp', 1, new Tyre('Bridgestone', 4));
    }
}

class CarFactory {
    constructor() {
        this.mobilioList = [];
        this.civicList = [];
    }

    mobilioProduced(year) {
        let totalMobilio = CarFactory.getRandomInt();
        for (let i = 0; i < totalMobilio; i++) {
            this.mobilioList.push(new Mobilio(year));
        }
    }

    civicProduced(year) {
        let totalCivic = CarFactory.getRandomInt();
        for (let i = 0; i < totalCivic; i++) {
            this.civicList.push(new Civic(year));
        }
    }

    productionResult() {
        console.log(`Mobilio telah diproduksi sebanyak ${this.mobilioList.length}`);
        for (let i = 0; i < this.mobilioList.length; i++) {
            console.log(this.mobilioList[i]);
        }
        console.log(`Civic telah diproduksi sebanyak ${this.civicList.length}`);
        for (let i = 0; i < this.civicList.length; i++) {
            console.log(this.civicList[i]);
        }
    }

    guaranteeSimulation(year) {
        console.log(`Hasil simulasi untuk Mobilio, yakni :`);
        for (let i = 0; i < this.mobilioList.length; i++) {
            console.log(this.mobilioList[i]);
            this.mobilioList[i].expireGuarantee(year);
        }
        console.log(`Hasil simulasi untuk Civic, yakni :`);
        for (let i = 0; i < this.civicList.length; i++) {
            console.log(this.civicList[i]);
            this.civicList[i].expireGuarantee(year);
        }
    }

    static getRandomInt() {
        let min = 1;
        let max = 3;
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

new CarFactory()
    .mobilioProduced(2012)
    .civicProduced(2013)
    .productionResult()
    .guaranteeSimulation(2015)