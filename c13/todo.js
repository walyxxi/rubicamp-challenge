const fs = require('fs');

let data = JSON.parse(fs.readFileSync('todo.json', 'utf8'));
let input = process.argv;

switch (input[2]) {
    case 'help':
        console.log(
            '>>> JS TODO <<<\n' +
            '$ node todo.js <command>\n' +
            '$ node todo.js list\n' +
            '$ node todo.js task <task_id>\n' +
            '$ node todo.js add <task_content>\n' +
            '$ node todo.js delete <task_id>\n' +
            '$ node todo.js complete <task_id>\n' +
            '$ node todo.js uncomplete <task_id>\n' +
            '$ node todo.js list:outstanding asc|desc\n' +
            '$ node todo.js list:completed asc|desc\n' +
            '$ node todo.js tag <task_id> <tag_name_1> <tag_name2>...<tag_name_N>\n' +
            '$ node todo.js filter:<tag_name>'
        );
        break;

    case 'add':
        let output = '';
        for (let i = 3; i < input.length; i++) {
            output += input[i] + ' ';
        }
        data.push({
            'status': false,
            'task_content': output,
            'tag': []
        })
        fs.writeFileSync('todo.json', JSON.stringify(data, null, 3));
        console.log(`"${output}" telah ditambahkan!`);
        break;

    case 'list':
        console.log('Daftar Pekerjan');
        for (let j = 0; j < data.length; j++) {
            console.log(`${j + 1}.${data[j].status ? '[x]' : '[ ]'} ${data[j].task_content}`);
        }
        break;

    case 'list:completed':
        console.log('Daftar Pekerjan');
        if (input[3] == 'asc') {
            for (let k = 0; k < data.length; k++) {
                if (data[k].status) {
                    console.log(`${k + 1}.${data[k].status ? '[x]' : '[ ]'} ${data[k].task_content}`);
                }
            }
        } else if (input[3] == 'desc') {
            for (let k = data.length - 1; k >= 0; k--) {
                if (data[k].status) {
                    console.log(`${k + 1}.${data[k].status ? '[x]' : '[ ]'} ${data[k].task_content}`);
                };
            }
        }
        break;

    case 'list:outstanding':
        console.log('Daftar Pekerjan');
        if (input[3] == 'asc') {
            for (let l = 0; l < data.length; l++) {
                if (!data[l].status) {
                    console.log(`${l + 1}.${data[l].status ? '[x]' : '[ ]'} ${data[l].task_content}`);
                }
            }
        } else if (input[3] == 'desc') {
            for (let l = data.length - 1; l >= 0; l--) {
                if (!data[l].status) {
                    console.log(`${l + 1}.${data[l].status ? '[x]' : '[ ]'} ${data[l].task_content}`);
                }
            }
        }
        break;

    case 'complete':
        let index = parseInt(input[3]) - 1;
        data[index].status = true;
        fs.writeFileSync('todo.json', JSON.stringify(data, null, 3));
        console.log(`"${data[index].task_content}" telah selesai!`);
        break;

    case 'uncomplete':
        let index1 = parseInt(input[3]) - 1;
        data[index1].status = false;
        fs.writeFileSync('todo.json', JSON.stringify(data, null, 3));
        console.log(`"${data[index1].task_content}" status selesai dibatalkan!`);
        break;

    case 'delete':
        let index2 = parseInt(input[3]) - 1;
        data.splice(index2, 1);
        console.log(`"${data[index2].task_content}" telah dihapus dari daftar!`);
        fs.writeFileSync('todo.json', JSON.stringify(data, null, 3));
        break;

    case 'tag':
        let index3 = parseInt(input[3]) - 1;
        for (let m = 4; m < input.length; m++) {
            if (!data[index3].tag.includes(input[m])) {
                data[index3].tag.push(input[m]);
            }
        }
        console.log(`"${data[index3].tag}" telah ditambahkan ke daftar "${data[index3].task_content}"`);
        fs.writeFileSync('todo.json', JSON.stringify(data, null, 3));
        break;

    case undefined:
        console.log(
            '>>> JS TODO <<<\n' +
            '$ node todo.js <command>\n' +
            '$ node todo.js list\n' +
            '$ node todo.js task <task_id>\n' +
            '$ node todo.js add <task_content>\n' +
            '$ node todo.js delete <task_id>\n' +
            '$ node todo.js complate <task_id>\n' +
            '$ node todo.js uncomplete <task_id>\n' +
            '$ node todo.js list:outstanding asc|desc\n' +
            '$ node todo.js list:completed asc|desc\n' +
            '$ node todo.js tag <task_id> <tag_name_1> <tag_name2>...<tag_name_N>\n' +
            '$ node todo.js filter:<tag_name>'
        );
        break;
}

filter(input[2]);

function filter() {
    let proses = input[2].slice(0, 7);
    console.log('Daftar Pekerjaan');
    if (proses == 'filter:') {
        data.map((item, index) => {
            if (item.tag.includes(input[2].slice(7))) {
                console.log(`${index + 1}.${item.status ? '[x]' : '[ ]'} ${item.task_content}`);
            }
        })
    };
};