function pola(str) {
    let m = str.split(" ");
    let hasil = [];
    for (let i = 0; i < 10; ++i) {
        var m0 = m[0].replace(/#/i, i);
        for (let j = 0; j < 10; ++j) {
            var m4 = m[4].replace(/#/i, j);
            if (parseInt(m0) * parseInt(m[2]) == parseInt(m4)) {
                hasil.push(i, j);
            }
        }
    }
    return hasil;
}
console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));