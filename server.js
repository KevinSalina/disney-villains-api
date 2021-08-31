const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2')

// Import Controllers
const { getAllVillains, getVillainBySlug, createNewVillain } = require('./controllers/villains')

// Import Sequelize Model
const model = require('./models')
const villains = require('./villains.js')
const { Op } = require('sequelize')

// App config
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

// Import Villains.js into SQL Database
// model.villains.bulkCreate(villains)
//   .then(() => {
//     console.log('Succes')
//   })

// Get all villains
app.get('/villains', getAllVillains)

// Get villain by slug
app.get('/villains/:slug', getVillainBySlug)

// Create a New villain
app.post('/villains', createNewVillain)

app.all('*', (req, res) => res.sendStatus(404))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})