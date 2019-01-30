var fs = require('fs');

var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban: '
});

let i = 0;

console.log(`Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar!\n`);
console.log(`Pertanyaan: ${data[i].definition}`);
rl.prompt();
rl.on('line', (answer) => {
    if (answer.toLowerCase() == data[i].term.toLowerCase()) {
        console.log('Anda Benar!\n');
        i++;
        if (i == data.length) {
            console.log('Anda Menang!');
            rl.close();
        }
        console.log(`Pertanyaan : ${data[i].definition}`);
        rl.prompt();
    } else {
        console.log('Anda Salah!');
        rl.prompt();
    }
    // switch (answer) {
    //     case answer = data[0].term:
    //         console.log('Jawaban Anda Benar!\n');
    //         console.log(`Pertanyaan: ${data[1].definition}`)
    //         rl.prompt();
    //         break;
    //     case answer = data[1].term:
    //         console.log('Jawaban Anda Benar!\n');
    //         console.log(`Pertanyaan: ${data[2].definition}`)
    //         rl.prompt();
    //         break;
    //     case answer = data[2].term:
    //         console.log('Jawaban Anda Benar!\n');
    //         console.log('Hore Anda Menang!\n');
    //         break;
    //     default:
    //         console.log('Jawaban Anda Salah!\n');
    //         rl.prompt();
    //         break;
    // }
}).on('close', () => {
    console.log('Terima Kasih!');
    process.exit(0);
})