/* eslint-disable import/no-duplicates, no-undef */

import { expect } from 'chai'
import chai from 'chai'
import UserDataHandler from './user_data_handler'
import mockUsers from '../../data/users.json'
import nock from 'nock'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('UserDataHandler:', () => {
  const userDataHandler = new UserDataHandler()

  after(function () {
    nock.restore()
  })

  afterEach(function () {
    nock.cleanAll()
  })

  it('(1) loadUsers() should return list of all users', async () => {
    await userDataHandler.loadUsers()
    expect(userDataHandler.users).to.deep.equal(mockUsers)
  })

  it('(3) loadUsers() should return error if someting went wrong', async () => {
    nock('http://localhost:3000')
      .get('/users')
      .reply(504)
    expect(Promise.resolve(userDataHandler.loadUsers())).to.be.rejectedWith('Failed to load users data: Error: Request failed with status code 504')
  })

  it('(2) getNumberOfUsers() should return correct quntity of users', async () => {
    await userDataHandler.loadUsers()
    expect(userDataHandler.getNumberOfUsers()).to.deep.equal(mockUsers.length)
  })

  it('(4) isMatchingAllSearchParams() should return true if user matches all search parameters', async () => {
    const { name, username, email } = mockUsers[0]
    const searchParameter = {
      name,
      username,
      email
    }
    await userDataHandler.loadUsers()
    expect(userDataHandler.isMatchingAllSearchParams(userDataHandler.users[0], searchParameter)).to.deep.equal(true)
  })

  it('(5) isMatchingAllSearchParams() should return false if user does not match even one search parameters', async () => {
    const { name, username } = mockUsers[0]
    const searchParameter = {
      name,
      username,
      email: 'nonExistent@email.com'
    }
    await userDataHandler.loadUsers()
    expect(userDataHandler.isMatchingAllSearchParams(userDataHandler.users[0], searchParameter)).to.deep.equal(false)
  })

  it('(6) findUsers() should find existing user by email', async () => {
    await userDataHandler.loadUsers()
    userDataHandler.findUsers({ email: mockUsers[0].email })
    expect(userDataHandler.findUsers({ email: mockUsers[0].email })).to.deep.equal(userDataHandler.findUsers({ email: userDataHandler.users[0].email }))
  })

  it('(7) findUsers() should return error if user with email does not exist', async () => {
    await userDataHandler.loadUsers()
    const nonExistingEmail = 'some@email.com'
    expect(() => userDataHandler.findUsers({ email: nonExistingEmail })).to.throw('No matching users found!')
  })

  it('(8) findUsers() should return error if no search parameters were provided', async () => {
    await userDataHandler.loadUsers()
    expect(() => userDataHandler.findUsers()).to.throw('No search parameters provoded!')
  })

  it('(9) findUsers() should return error if uses were not loaded', async () => {
    nock('http://localhost:3000')
      .get('/users')
      .reply(200, [])
    await userDataHandler.loadUsers()
    expect(() => userDataHandler.findUsers({ email: mockUsers[0].email })).to.throw('No users loaded!')
  })

  it('(10) getUserEmailsList() should return a string with users emails separated with semicolon', async () => {
    await userDataHandler.loadUsers()
    const formActualEmailsList = () => {
      const actualEmailsList = []
      mockUsers.forEach((user) => actualEmailsList.push(user.email))
      return actualEmailsList
    }
    const actualEmailsListString = (await formActualEmailsList()).join(';')
    expect(userDataHandler.getUserEmailsList()).to.deep.equal(actualEmailsListString)
  })

  it('(11) getUserEmailsList() should return error if users were not loaded', async () => {
    nock('http://localhost:3000')
      .get('/users')
      .reply(200, [])
    await userDataHandler.loadUsers()
    expect(() => userDataHandler.getUserEmailsList()).to.throw('No users loaded!')
  })
})
