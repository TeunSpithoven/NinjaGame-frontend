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
})

describe('Stats', () => {
  it('Visits the stats url', () => {
    cy.visit(`${url}/stats`)
  })
  it('Checks if the Update button is present', () => {
    cy.contains('button', 'Update')
  })
})
