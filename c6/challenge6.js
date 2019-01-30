function sentenceManipulation(sentence) {
    let hasil = "";
    let thasil = [];
    let kata = sentence.split(" ");
    for (let i = 0; i < kata.length; i++) {
        if (kata[i][0] == 'a' || kata[i][0] == 'i' || kata[i][0] == 'u' || kata[i][0] == 'e' || kata[i][0] == 'o') {
            thasil.push(kata[i])
        } else {
            kata[i].substr(1);
            let thp = kata[i][0];
            // thasil.push(`${kata[i].substr(1)}${thp}nyo`)
            thasil.push(kata[i].substr(1)+thp+'nyo');
        }
    }
    hasil = thasil.join(" ");
    console.log(hasil);
}
sentenceManipulation('ibu pergi ke pasar bersama aku dan bapak');

// ibu ergipnyo eknyo asarpnyo ersamabnyo aku

