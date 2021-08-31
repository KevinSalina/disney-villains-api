const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chai = require('chai')
const { describe, it, before, afterEach, beforeEach } = require('mocha')
const { getAllVillains, getVillainBySlug, createNewVillain } = require('../../controllers/villains')
const { villains, singleVillain } = require('../mocks/mockVillains')
const model = require('../../models')
const { Op } = require('sequelize')

chai.use(sinonChai)
const { expect } = chai

describe('villains controllers tests', () => {
  let sandBox
  let stubFindAll
  let stubCreate
  let stubSend
  let stubSendStatus
  let res

  before(() => {
    sandBox = sinon.createSandbox()

    stubFindAll = sandBox.stub(model.villains, 'findAll')
    stubCreate = sandBox.stub(model.villains, 'create')

    stubSend = sandBox.stub()
    stubSendStatus = sandBox.stub()


    res = {
      send: stubSend,
      sendStatus: stubSendStatus
    }
  })

  afterEach(() => {
    sandBox.reset()
  })

  describe('getAllVillains', () => {
    it('Retrieves and displays all the villains from DB using res.send method', async () => {
      stubFindAll.returns(villains)

      await getAllVillains({}, res)

      expect(stubSend).to.have.been.calledWith(villains)
      expect(stubFindAll).to.have.callCount(1)
    })
  })

  describe('getVillainBySlug', () => {
    it('Retrieves villain(s) associated with slug from DB using res.send method', async () => {
      const req = { params: { slug: 'hook' } }
      stubFindAll.returns(singleVillain)

      await getVillainBySlug(req, res)

      expect(stubSend).to.have.been.calledWith(singleVillain)
      expect(stubFindAll).to.have.been.calledWith({ where: { name: { [Op.substring]: 'hook' } } })
    })

    it('If no villain is found, return res.status 404', async () => {
      stubFindAll.returns(null)
      const req = { params: { slug: 'notAVillain' } }

      await getVillainBySlug(req, res)

      expect(stubSendStatus).to.have.been.calledWith(404)
      expect(stubFindAll).to.have.been.calledWith({ where: { name: { [Op.substring]: 'notAVillain' } } })
    })

    it('Returns res.status 500 if database throws an error', async () => {
      stubFindAll.throws('error')
      const req = { params: { slug: 'error' } }

      await getVillainBySlug(req, res)

      expect(stubFindAll).to.have.been.calledWith({ where: { name: { [Op.substring]: 'error' } } })
      expect(stubSendStatus).to.have.been.calledWith(500)
    })
  })

  describe('createNewVillain', () => {
    it('Takes the req.body and creates a new team in DB', async () => {
      const req = { body: singleVillain }
      stubCreate.returns(singleVillain)

      await createNewVillain(req, res)

      expect(stubSend).to.have.been.calledWith(singleVillain)
      expect(stubCreate).to.have.been.calledWith(singleVillain)

    })
  })

})