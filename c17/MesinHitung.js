export default class MesinHitung {
    constructor() {
        this.x = 1;
    }

    add(num) {
        this.x += num;
        return this;
    }

    subtract(num) {
        this.x -= num;
        return this;
    }

    multiply(num) {
        this.x *= num;
        return this;
    }

    divide(num) {
        this.x /= num;
        return this;
    }

    square() {
        this.x = Math.pow(this.x, 2);
        return this;
    }

    exponent(num) {
        this.x = Math.pow(this.x, num);
        return this;
    }

    squareRoot() {
        this.x = Math.sqrt(this.x, 2);
        return this;
    }

    result() {
        console.log(this.x);
        return this;
    }
}