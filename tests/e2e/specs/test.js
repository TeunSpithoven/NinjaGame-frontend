// https://docs.cypress.io/api/introduction/api.html

describe('Visit root', () => {
  it('Visits the app root url', () => {
    cy.visit('localhost:8080/')
    cy.contains('h1', 'Hallo dit is het menu')
  })
})

const username = 'cypresstestuser';
const password = 'jfklldhflisd@!44';

describe('Register', () => {
  it('Visits the register url', () => {
    cy.visit('localhost:8080/register')
    cy.contains('button', 'Register')
    cy.get('input[id="usernameInput"]').type(username)
    cy.get('input[id="passwordInput"]').type(password)
    cy.wait(1000)
    cy.get('button').click()
  })
})

describe('Log in', () => {
  it('Visits the login url', () => {
    cy.visit('localhost:8080/login')
    cy.contains('button', 'Login')
    cy.get('input[id="usernameInput"]').type(username)
    cy.get('input[id="passwordInput"]').type(password)
    cy.get('button').click()
  })
})
