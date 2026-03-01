import { loginSignUpConsts } from '../fixtures/loginSignUp/consts'
import { globalPages } from '../fixtures/global/pages'
import { globalConsts } from '../fixtures/global/consts'
import { loginSignUpPages } from '../fixtures/loginSignUp/pages'
import { loginSignUpMessages } from '../fixtures/loginSignUp/consts'
import { productsPages } from '../fixtures/products/pages'
import { productsConsts } from '../fixtures/products/consts'

/**
 * Creates a new user account via API
 * @param {string} email - User email address (defaults to loginSignUpConsts.email)
 * @param {string} password - User password (defaults to loginSignUpConsts.password)
 * @param {string} firstName - User first name (defaults to loginSignUpConsts.firstName)
 * @param {string} lastName - User last name (defaults to loginSignUpConsts.lastName)
 * @param {string} username - User username (defaults to loginSignUpConsts.username)
 * @param {string} [company] - Company name (defaults to loginSignUpConsts.companyName)
 * @param {string} [address1] - Address line 1 (defaults to loginSignUpConsts.address)
 * @param {string} [address2] - Address line 2 (defaults to loginSignUpConsts.addressLine2)
 * @param {string} [city] - City (defaults to loginSignUpConsts.city)
 * @param {string} [state] - State (defaults to loginSignUpConsts.state)
 * @param {string} [zipcode] - Zip code (defaults to loginSignUpConsts.zipCode)
 * @returns {object} Created user object with all provided/default values
 */
// Custom command to create a new user via API
Cypress.Commands.add('createUserViaAPI', (email, password, firstName, lastName, username, company, address1, address2, city, state, zipcode) => {
  const user = {
    name: username || loginSignUpConsts.username,
    email: email || loginSignUpConsts.email,
    password: password || loginSignUpConsts.password,
    title: loginSignUpConsts.title,
    birth_date: loginSignUpConsts.birthDay,
    birth_month: loginSignUpConsts.birthMonth,
    birth_year: loginSignUpConsts.birthYear,
    firstname: firstName || loginSignUpConsts.firstName,
    lastname: lastName || loginSignUpConsts.lastName,
    company: company || loginSignUpConsts.companyName,
    address1: address1 || loginSignUpConsts.address,
    address2: address2 || loginSignUpConsts.addressLine2,
    country: loginSignUpConsts.country,
    zipcode: zipcode || loginSignUpConsts.zipCode,
    state: state || loginSignUpConsts.state,
    city: city || loginSignUpConsts.city,
    mobile_number: loginSignUpConsts.phoneNumber
  }

  cy.request({
    method: 'POST',
    url: `${Cypress.config().baseUrl}api/createAccount`,
    form: true,
    body: user
  }).then((response) => {
    expect(response.status).to.eq(200)
    const responseBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
    expect(responseBody.message).to.equal('User created!')
    return user
  })
})

/**
 * Deletes a user account via API
 * @param {string} [email] - Email of user to delete (defaults to loginSignUpConsts.email)
 * @param {string} [password] - Password of user to delete (defaults to loginSignUpConsts.password)
 * @returns {void} Logs the delete response but doesn't fail on error (best-effort cleanup)
 */
// Custom command to delete user via API
Cypress.Commands.add('deleteUserViaAPI', (email, password) => {
  const deleteEmail = email || loginSignUpConsts.email
  const deletePassword = password || loginSignUpConsts.password
  
  cy.request({
    method: 'DELETE',
    url: `${Cypress.config().baseUrl}api/deleteAccount`,
    form: true,
    body: {
      email: deleteEmail,
      password: deletePassword
    },
    failOnStatusCode: false
  }).then((response) => {
    // Cleanup is best-effort - just log the response
    const responseBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
    cy.log(`Delete account response: ${responseBody.message || response.status}`)
  })
})

/**
 * Verifies that a user exists via API login check
 * @param {string} [email] - Email to verify (defaults to loginSignUpConsts.email)
 * @param {string} [password] - Password to verify (defaults to loginSignUpConsts.password)
 * @returns {void} Asserts user exists with 'User exists!' response message
 */
// Custom command to verify user exists via API
Cypress.Commands.add('verifyUserExists', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config().baseUrl}api/verifyLogin`,
    form: true,
    body: {
      email: email || loginSignUpConsts.email,
      password: password || loginSignUpConsts.password
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    const responseBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
    expect(responseBody.message).to.equal('User exists!')
  })
})

/**
 * Navigates to the signup/login page and validates the login page is loaded
 * @returns {void} Completes navigation and validation
 */
// Navigation helper to signup page
Cypress.Commands.add('navigateToSignupPage', () => {
  cy.visit('/')
  cy.url().should('eq', `${Cypress.config().baseUrl}`)
  cy.get(globalPages.signUpLogin).should('be.visible')
  cy.get(globalPages.signUpLogin).click()
  cy.url().should('eq', `${Cypress.config().baseUrl}login`)
  cy.contains(loginSignUpMessages.newUserSignUp).should('be.visible')
})

/**
 * Navigates to the login form and validates the login form is visible
 * @returns {void} Completes navigation and validation
 */
// Navigation helper to login form
Cypress.Commands.add('navigateToLoginForm', () => {
  cy.visit('/')
  cy.url().should('eq', `${Cypress.config().baseUrl}`)
  cy.get(globalPages.signUpLogin).should('be.visible').click()
  cy.url().should('eq', `${Cypress.config().baseUrl}login`)
  cy.contains(loginSignUpMessages.loginToYourAccount).should('be.visible')
  cy.get(loginSignUpPages.loginForm).should('be.visible')
})

/**
 * Visits the homepage and verifies it loaded correctly
 * @returns {void} Completes navigation and validation
 */
// Navigation helper to homepage
Cypress.Commands.add('visitHomepage', () => {
  cy.visit('/')
  cy.url().should('eq', `${Cypress.config().baseUrl}`)
  cy.contains(globalConsts.welcomeMessage).should('be.visible')
})

/**
 * Logs in a user with email and password
 * @param {string} [email] - Email to login with (defaults to loginSignUpConsts.email)
 * @param {string} [password] - Password to login with (defaults to loginSignUpConsts.password)
 * @returns {void} Completes login and verification
 */
// Login helper
Cypress.Commands.add('login', (email, password) => {
  cy.navigateToLoginForm()
  cy.get(loginSignUpPages.loginEmailInput).type(email || loginSignUpConsts.email)
  cy.get(loginSignUpPages.loginPasswordInput).type(password || loginSignUpConsts.password)
  cy.get(loginSignUpPages.loginButton).click()
  cy.url().should('eq', `${Cypress.config().baseUrl}`)
})

/**
 * Adds a product to cart by index
 * @param {number} [index=0] - Index of the product to add (defaults to first product)
 * @returns {void} Completes add to cart action
 */
// Add product to cart helper
Cypress.Commands.add('addProductToCart', (index = 0) => {
  cy.get(productsPages.productItem).eq(index).within(() => {
    cy.contains(productsConsts.addToCart).click()
  })
})