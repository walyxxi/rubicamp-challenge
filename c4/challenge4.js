function cekPrima(n) {
    let max = Math.sqrt(n);
    for (let i = 2; i <= max; i++) {
        if (n % i == 0)
            return false;
    }
    return true;
}

function indexPrima(param1) {
    let count = 0;
    let bilangan = 1;
    while (count < param1) {
        bilangan++;
        if (cekPrima(bilangan)) {
            count++;
        }
    }
    return bilangan;
}
console.log(indexPrima(4));
console.log(indexPrima(500));
console.log(indexPrima(37786));