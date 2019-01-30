function romawi(n) {
    let desc = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    let roma = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
    let hasil = '';
    for (let i = 12; i >= 0; i--) {
        while (n >= desc[i]) {
            n -= desc[i];
            hasil += roma[i];
        }
    }
    return hasil;
}
console.log("input | expexted |result")
console.log("______|__________|________")
console.log("4     |IV        |", romawi(4));
console.log("9     |IX        |", romawi(9));
console.log("13    |XXI       |", romawi(13));
console.log("1453  |MCDLIII   |", romawi(1453));
console.log("1646  |MDCXLVI   |", romawi(1646));