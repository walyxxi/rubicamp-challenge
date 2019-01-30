const fs = require('fs');

const filePath = process.argv[2];

if (!filePath) {
    console.log('Tolong sertakan nama file sebagai inputan soalnya!');
    process.exit(1);
}

let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(data);


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban: '
});

let i = 0;
let count = 0;

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
        console.log(`Pertanyaan: ${data[i].definition}`);
        rl.prompt();
    } else if (answer.toLowerCase() == 'skip') {
        data.push(data[i]);
        i++;
        console.log(`\nPertanyaan: ${data[i].definition}`);
        rl.prompt();
    } else {
        count++;
        console.log(`Anda Belum Beruntung! Anda telah salah ${count} kali, silahkan coba lagi!`);
        rl.prompt();
    }
    
}).on('close', () => {
    console.log('Selamat & Terima Kasih!');
    process.exit(0);
})