// https://docs.cypress.io/api/introduction/api.html
const url = 'localhost:8080';
const username = 'cypresstestuser';
const password = 'jfklldhflisd@!44';

/* eslint-disable */
describe('Visit root', () => {
  it('Visits the app root url', () => {
    cy.visit(`${url}/`)
    cy.contains('h1', 'Hallo dit is het menu')
  })
})

describe('Register', () => {
  it('Visits the register url', () => {
    cy.visit(`${url}/register`)
  })
  it('Checks if the register button is present', () => {
    cy.contains('button', 'Register')
  })
  it('Inputs the form data', () => {
    cy.get('input[id="usernameInput"]').type(username)
    cy.get('input[id="passwordInput"]').type(password)
  })
  it('Clicks the register button', () => {
    cy.get('button').click()
  })
})

describe('Log in', () => {
  it('Visits the login url', () => {
    cy.wait(1000)
    cy.visit(`${url}/login`)
  })
  it('Checks if the login button is present', () => {
    cy.contains('button', 'Login')
  })
  it('Inputs the form data', () => {
    cy.get('input[id="usernameInput"]').type(username)
    cy.get('input[id="passwordInput"]').type(password)
  })
  it('Clicks the login button', () => {
    cy.get('button').click()
  })
  it('Checks for the succes message', () => {
    cy.contains('h3', 'succesfully logged in')
  })
})

describe('Stats', () => {
  it('Visits the stats page', () => {
    cy.contains('a', 'Stats').click()
  })
  it('Checks if the Update button is present', () => {
    cy.contains('button', 'Update')
  })
  it('Checks if the Create Game button is present', () => {
    cy.contains('button', 'Create Game')
  })
  it('Clicks the create button', () => {
    cy.get('button[id="showCreateButton"]').click()
  })
  it('Fills in the username', () => {
    cy.get('input[id="usernameInput"]').type(username)
  })
  it('Fills in the score', () => {
    cy.get('input[id="scoreInput"]').type(120)
  })
  it('Clicks the create button', () => {
    cy.get('button[id="submitCreate"]').click()
  })
  it('Clicks the update button', () => {
    cy.contains('button', 'Update').click()
    cy.contains('button', 'Update').click()
  })
  it('Checks for the created game', () => {
    cy.contains('li', '120, cypresstestuser')
  })
})
describe('Game', () => {
  it('Visits the game page', () => {
    cy.contains('a', 'Game').click()
  })
  it('Checks if the Connect button is present', () => {
    cy.contains('button', 'Connect')
  })
  it('Fills in the gamename', () => {
    cy.get('input[id="gamenameInput"]').type('cypresstestgame')
  })
  it('Clicks the Connect button', () => {
    cy.get('button[id="connectButton"]').click()
  })
  it('Checks if the buttons are present', () => {
    cy.contains('button', 'Disconnect')
    cy.contains('button', 'Up')
    cy.contains('button', 'Left')
    cy.contains('button', 'Right')
    cy.contains('button', 'Down')
  })
  // test clicking a button (only if the game server is running)
  // it('Clicks the right button', () => {
  //   cy.get('button[id="rightButton"]').click()
  // })
})
