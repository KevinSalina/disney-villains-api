const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2')

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
app.get('/villains', async (req, res) => {
  const villains = await model.villains.findAll()

  res.send(villains)
})

// Get villain by slug
app.get('/villains/:slug', async (req, res) => {
  const { slug } = req.params

  const villains = await model.villains.findAll({
    where: {
      name: {
        [Op.substring]: `${slug}`
      }
    }
  })
  res.send(villains)
})

// Create a New villain
app.post('/villains', async (req, res) => {
  const newVillain = await model.villains.create({
    name: req.body.name,
    movie: req.body.movie,
    slug: req.body.slug
  })

  console.log(newVillain)
})

app.all('*', (req, res) => res.sendStatus(404))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})