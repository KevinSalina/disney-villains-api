const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chai = require('chai')
const { describe, it, before, afterEach, beforeEach } = require('mocha')
const { getAllVillains, getVillainBySlug, createNewVillain } = require('../../controllers/villains')
const { villains, singleVillain } = require('../mocks/mockVillains')
const model = require('../../models')

chai.use(sinonChai)
const { expect } = chai

describe('villains controllers tests', () => {
  describe('getAllVillains', () => {
    it('Retrievers and displays all the villains from DB using res.send method', async () => {
      const stubSend = sinon.stub()
      const res = { send: stubSend }
      const stubFindAll = sinon.stub(model.villains, 'findAll').returns(villains)

      await getAllVillains({}, res)

      expect(stubSend).to.have.been.calledWith(villains)
      expect(stubFindAll).to.have.callCount(1)
    })
  })
})