const model = require('../models')
const { Op } = require('sequelize')

const getAllVillains = async (req, res) => {
  const villains = await model.villains.findAll()

  res.send(villains)
}

const getVillainBySlug = async (req, res) => {
  const { slug } = req.params

  const villains = await model.villains.findAll({
    where: {
      name: {
        [Op.substring]: `${slug}`
      }
    }
  })
  res.send(villains)
}

const createNewVillain = async (req, res) => {
  const newVillain = await model.villains.create({
    name: req.body.name,
    movie: req.body.movie,
    slug: req.body.slug
  })

  console.log(newVillain)
}

module.exports = { getAllVillains, getVillainBySlug, createNewVillain }