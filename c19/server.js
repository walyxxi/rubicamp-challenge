var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();

let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../c19/database/data.json')));
const writeData = (data) => {
  fs.writeFileSync(path.join(__dirname, '../c19/database/data.json'), JSON.stringify(data, null, 3), 'utf8');
};

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {
        data : data,
        title: 'BREAD'
    });
});

// berkunjung ke router http://localhost:3000/add
app.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add Data'
    })
})

// berkunjung ke router http://localhost:3000/add dengan metode post
app.post('/add', (req, res) => {
    let id = data.length + 1;
    data.push({ id: id, 
                string: req.body.string, 
                integer: req.body.integer,
                float: req.body.float,
                date: req.body.date,
                boolean: req.body.boolean
    })
    writeData(data);
    res.redirect('/');
})

app.get('/edit/:id', (req, res, next) => {
    let id = req.params.id
    var index = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            index = i;
            break;
        }
    }
    res.render('edit', {
        title: 'Edit Data',
        item: data[index]
    })
})

app.post('/edit/:id', (req, res) => {
    let id = req.params.id;
    var index = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            index = i;
            break;
        }
    }
    data[index].string = req.body.string;
    data[index].integer = req.body.integer;
    data[index].float = req.body.float;
    data[index].date = req.body.date;
    data[index].boolean = req.body.boolean;
    writeData(data);
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    let id = req.params.id
    data = data.filter((item) => {return item.id != id});
    res.redirect('/');
  })

app.listen(3000, () => {
    console.log('Server started on Port 3000!');
})