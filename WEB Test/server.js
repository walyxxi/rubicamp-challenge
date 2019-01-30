const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')

//data
let data = [{id: 1, task: "belajar coding"}, {id: 2, task: "tidur"}, {id: 3, task: "makan"}]

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views')) // specify the views directory
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, 'public')))

// berkunjung ke router http://localhost:3000/
app.get('/', (req, res) => {
  res.render('list', {data: data})
})

// berkunjung ke router http://localhost:3000/add
app.get('/add', (req, res) => {
  res.render('add')
})

// berkunjung ke router http://localhost:3000/add dengan metode post
app.post('/add', (req, res) => {
  data.push({id: Date.now(), task: req.body.task})
  res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
  let id = req.params.id
  data = data.filter((item)=>{return item.id != id});
  res.redirect('/');
})

app.listen(3000, () => {
  console.log(`web ini berjalan di port 3000!`)
})
