const model = require('../models')
const { Op } = require('sequelize')

const getAllVillains = async (req, res) => {
  const villains = await model.villains.findAll()

  res.send(villains)
}

const getVillainBySlug = async (req, res) => {
  try {
    const { slug } = req.params

    const villains = await model.villains.findAll({
      where: {
        name: {
          [Op.substring]: `${slug}`
        }
      }
    })

    return villains ? res.send(villains) : res.sendStatus(404)
  } catch (error) {
    console.log(error)

    return res.sendStatus(500)
  }

}

const createNewVillain = async (req, res) => {
  const newVillain = await model.villains.create({
    name: req.body.name,
    movie: req.body.movie,
    slug: req.body.slug
  })

  return res.send(newVillain)
}

module.exports = { getAllVillains, getVillainBySlug, createNewVillain }