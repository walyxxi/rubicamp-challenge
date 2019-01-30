function weirdMultiple(number) {
    let n = number.toString();
    let m = n.split("");
    if (m.length < 2) {
        return number;
    }
    let total = 1;
    for (let i = 0; i < m.length; ++i) {
        total *= parseInt(m[i]);
    }
    return weirdMultiple(total);
};
console.log(weirdMultiple(39));
console.log(weirdMultiple(999));
console.log(weirdMultiple(3));