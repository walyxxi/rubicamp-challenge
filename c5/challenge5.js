function stringManipulation(word) {
    let hrf = word[0];
    // let str = kata.match(/[b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,y,z]/i);
    // if (hrf == 'a'||hrf == 'i'||hrf == 'u'||hrf == 'e'||hrf == 'o') {
    if (word.includes('a', 'i', 'u', 'e', 'o')) {
        return word;
    }
    let str = word;
    let res = str.substr(1);
    let hasil = res + hrf + "nyo";
    return hasil;
}
console.log(stringManipulation("ayam"));
console.log(stringManipulation("bebek"));
console.log(stringManipulation("ular"));
console.log(stringManipulation("burung"));