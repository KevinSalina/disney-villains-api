// Dependencies
const express = require('express')
const app = express()
const mysql = require('mysql2')

// Import Controllers
const { getAllVillains, getVillainBySlug, createNewVillain } = require('./controllers/villains')

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

const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})