function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; ++i) {
        total += arguments[i];
    }
    console.log(total);
}
sum(1, 2, 7);