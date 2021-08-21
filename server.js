const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2')

// Import Sequelize Model
const model = require('./models')
const villains = require('./villains.js')

// App config
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

// Import Villains.js into SQL Database
model.villains.bulkCreate(villains)
  .then(() => {
    console.log('Succes')
  })

app.get('/', (req, res) => {
  res.send('hello')
})

app.all('*', (req, res) => res.sendStatus(404))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})