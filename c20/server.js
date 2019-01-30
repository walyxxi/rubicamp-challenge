var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// connect to database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('c20.db');

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Home & Filter
app.get('/', (req, res, next) => {
    const page = req.query.page || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    const url = req.url == '/' ? '/?page=1' : req.url
    let params = [];
    let isFilter = false;

    if (req.query.checkid && req.query.id) {
        params.push(`id=${req.query.id}`);
        isFilter = true;
    }
    if (req.query.checkstring && req.query.string) {
        params.push(`string like '%${req.query.string}%'`);
        isFilter = true;
    }
    if (req.query.checkinteger && req.query.integer) {
        params.push(`integer=${req.query.integer}`);
        isFilter = true;
    }
    if (req.query.checkfloat && req.query.float) {
        params.push(`float=${req.query.float}`);
        isFilter = true;
    }
    if (req.query.checkdate && req.query.startdate && req.query.edate) {
        params.push(`date between '${req.query.sdate}' and '${req.query.edate}'`);
        isFilter = true;
    }
    if (req.query.checkboolean && req.query.boolean) {
        params.push(`boolean=${req.query.boolean}`);
        isFilter = true;
    }
    let sql = `SELECT COUNT(*) AS total FROM t_data`;
    if (isFilter) {
        sql += ` WHERE ${params.join(' AND ')}`
    }
    db.all(sql, (err, count) => {
        const total = count[0].total;
        const pages = Math.ceil(total / limit);
        sql = `SELECT * FROM t_data`;
        if (isFilter) {
            sql += ` WHERE ${params.join(' AND ')}`
        }
        sql += ` LIMIT ${limit} OFFSET ${offset}`;
        db.all(sql, (err, rows) => {
            res.render('index', {
                data: rows,
                page,
                pages,
                query: req.query,
                url,
                title : 'BREAD'
            });
        });
    });
});

// Get Form ADD
app.get('/add', (req, res, next) => {
    res.render('add', { title: 'Add Data' });
});

// Post Form ADD
app.post('/add', (req, res, next) => {
    let id = data.length + 1;
    let string = req.body.string;
    let integer = req.body.integer;
    let float = req.body.float;
    let date = req.body.date;
    let boolean = req.body.boolean;
    let sql = `INSERT INTO t_data (id, string, integer, float, date, boolean) VALUES ('${id},'${string}',${integer},${float},'${date}','${boolean}')`;
    db.run(sql, (err2) => {
        if (err2) throw err2;
        res.redirect('/');
    });
});

app.get('/edit/:id', (req, res, next) => {
    let id = parseInt(req.params.id);
    getData1((rows) => {
        var index = 0;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].id == id) {
                index = i;
                break;
            }
        }
        res.render('edit', { data: rows[index], title: 'Edit Data' });
    });
});

app.post('/edit/:id', (req, res, next) => {
    getData1((rows) => {
        let id = req.params.id;
        let string = req.body.string;
        let integer = req.body.integer;
        let float = req.body.float;
        let date = req.body.date;
        let boolean = req.body.boolean;
        let sql = `UPDATE t_data SET string = '${string}', integer = ${integer}, float = ${float}, date = '${date}', boolean = '${boolean}' WHERE id = ${id}`;
        db.run(sql, (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    });
});

app.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    db.run('DELETE FROM t_data WHERE id = ?', id, (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server started on Port 3000!');
})