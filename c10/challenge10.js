const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tuliskan kalimatmu disini > '
});

rl.prompt();

rl.on('line', (sentence) => {
    
    let result = [];
    let kata = sentence.split(" ");
    for (let i = 0; i < kata.length; i++) {
        if (kata[i][0] == 'a' || kata[i][0] == 'i' || kata[i][0] == 'u' || kata[i][0] == 'e' || kata[i][0] == 'o') {
            result.push(kata[i])
        } else {
            kata[i].substr(1);
            let thp = kata[i][0];
            result.push(kata[i].substr(1)+thp+'nyo');
        }
    }
    
    console.log(`Hasil konversi: ${result.join(" ")}`)
    rl.prompt();
    rl.on('close', () => {
        console.log("Good Bye!");
    });
});