import { globalPages } from '../fixtures/global/pages'
import { loginSignUpConsts, loginSignUpMessages } from '../fixtures/loginSignUp/consts'
import { loginSignUpPages } from '../fixtures/loginSignUp/pages'

afterEach(() => {
  // Delete user account via API using the email that was created in the test
  cy.deleteUserViaAPI(loginSignUpConsts.email, loginSignUpConsts.password)
  cy.clearCookies()
})

describe('User registration', () => {
  it('Create user successfully', () => {
    cy.navigateToSignupPage()
    cy.get(loginSignUpPages.signUpNameInput).type(loginSignUpConsts.username)
    cy.get(loginSignUpPages.signUpEmailInput).type(loginSignUpConsts.email)
    cy.get(loginSignUpPages.signUpButton).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}signup`)
    // Validate signup page loaded
    cy.contains(loginSignUpMessages.enterAccountInformation).should('be.visible') 
    cy.get(loginSignUpPages.loginForm).should('be.visible')
    cy.get(loginSignUpPages.titleRadioButton).eq(1).click()
    cy.get(loginSignUpPages.passwordInput).type(loginSignUpConsts.password)
    cy.get(loginSignUpPages.dayForm).select(loginSignUpConsts.birthDay)
    cy.get(loginSignUpPages.monthForm).select(loginSignUpConsts.birthMonth)
    cy.get(loginSignUpPages.yearForm).select(loginSignUpConsts.birthYear)
    cy.get(loginSignUpPages.newsletterCheckbox).check()
    cy.get(loginSignUpPages.offersCheckbox).check()
    cy.get(loginSignUpPages.firstNameInput).type(loginSignUpConsts.firstName)
    cy.get(loginSignUpPages.lastNameInput).type(loginSignUpConsts.lastName)
    cy.get(loginSignUpPages.companyInput).type(loginSignUpConsts.companyName)
    cy.get(loginSignUpPages.addressInput).type(loginSignUpConsts.address)
    cy.get(loginSignUpPages.address2Input).type(loginSignUpConsts.addressLine2)
    cy.get(loginSignUpPages.countryForm).select(loginSignUpConsts.country)
    cy.get(loginSignUpPages.stateInput).type(loginSignUpConsts.state)
    cy.get(loginSignUpPages.cityInput).type(loginSignUpConsts.city)
    cy.get(loginSignUpPages.zipCodeInput).type(loginSignUpConsts.zipCode)
    cy.get(loginSignUpPages.phoneNumberInput).type(loginSignUpConsts.phoneNumber)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.accountCreatedMessage).should('contain.text', loginSignUpMessages.accountCreated)
    // Validate user was created via API
    cy.verifyUserExists(loginSignUpConsts.email, loginSignUpConsts.password) 
    cy.get(loginSignUpPages.continueButton).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.contains(`Logged in as ${loginSignUpConsts.username}`).should('be.visible')
  });

  it('Validate required fields', () => {
    cy.navigateToSignupPage()
    // Name is required
    cy.get(loginSignUpPages.signUpButton).click()
    cy.get(loginSignUpPages.signUpNameInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill name, then check email is required
    cy.get(loginSignUpPages.signUpNameInput).type(loginSignUpConsts.username)
    cy.get(loginSignUpPages.signUpButton).click()
    cy.get(loginSignUpPages.signUpEmailInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill email with invalid format
    cy.get(loginSignUpPages.signUpEmailInput).type(loginSignUpConsts.invalidEmail)
    cy.get(loginSignUpPages.signUpButton).click()
    cy.get(loginSignUpPages.signUpEmailInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.emailValidationPattern, 'i'))
    })
    cy.get(loginSignUpPages.signUpEmailInput).clear().type(loginSignUpConsts.email)
    cy.get(loginSignUpPages.signUpButton).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}signup`)
    cy.contains(loginSignUpMessages.enterAccountInformation).should('be.visible')
    // Password is required
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.passwordInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill password, then check firstName is required
    cy.get(loginSignUpPages.passwordInput).type(loginSignUpConsts.password)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.firstNameInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill firstName, then check lastName is required
    cy.get(loginSignUpPages.firstNameInput).type(loginSignUpConsts.firstName)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.lastNameInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill lastName, then check address is required
    cy.get(loginSignUpPages.lastNameInput).type(loginSignUpConsts.lastName)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.addressInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill address, then check city is required
    cy.get(loginSignUpPages.addressInput).type(loginSignUpConsts.address)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.cityInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill city, then check state is required
    cy.get(loginSignUpPages.cityInput).type(loginSignUpConsts.city)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.stateInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill state, then check zipCode is required
    cy.get(loginSignUpPages.stateInput).type(loginSignUpConsts.state)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.zipCodeInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill zipCode, then check phoneNumber is required
    cy.get(loginSignUpPages.zipCodeInput).type(loginSignUpConsts.zipCode)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.phoneNumberInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill all required fields and verify account can be created
    cy.get(loginSignUpPages.phoneNumberInput).type(loginSignUpConsts.phoneNumber)
    cy.get(loginSignUpPages.titleRadioButton).eq(1).click()
    cy.get(loginSignUpPages.dayForm).select(loginSignUpConsts.birthDay)
    cy.get(loginSignUpPages.monthForm).select(loginSignUpConsts.birthMonth)
    cy.get(loginSignUpPages.yearForm).select(loginSignUpConsts.birthYear)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.accountCreatedMessage).should('contain.text', loginSignUpMessages.accountCreated)
    // Validate that user was created via API
    cy.verifyUserExists(loginSignUpConsts.email, loginSignUpConsts.password)
    cy.get(loginSignUpPages.continueButton).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.contains(`Logged in as ${loginSignUpConsts.username}`).should('be.visible')
  })

  it('Create user - e-mail already exists', () => {
    cy.createUserViaAPI(loginSignUpConsts.email, loginSignUpConsts.password, loginSignUpConsts.firstName, loginSignUpConsts.lastName, loginSignUpConsts.username)
    cy.navigateToSignupPage()
    cy.get(loginSignUpPages.signUpNameInput).should('be.visible')
    cy.get(loginSignUpPages.signUpNameInput).type(loginSignUpConsts.username)
    cy.get(loginSignUpPages.signUpEmailInput).type(loginSignUpConsts.email)
    cy.get(loginSignUpPages.signUpButton).click()
    cy.contains(loginSignUpMessages.emailAlreadyExists).should('be.visible')
  });
});

describe('User login', () => {
  beforeEach(() => {
    // Create user via API first
    cy.createUserViaAPI(loginSignUpConsts.email, loginSignUpConsts.password, loginSignUpConsts.firstName, loginSignUpConsts.lastName, loginSignUpConsts.username)
  })
  it('Login successfully', () => {
    cy.navigateToLoginForm()
    cy.get(loginSignUpPages.loginEmailInput).type(loginSignUpConsts.email)
    cy.get(loginSignUpPages.loginPasswordInput).type(loginSignUpConsts.password)
    cy.get(loginSignUpPages.loginButton).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.contains(`Logged in as ${loginSignUpConsts.username}`).should('be.visible')
  })

  it('Login - validate required fields', () => {
    cy.navigateToLoginForm()
    // Email is required
    cy.get(loginSignUpPages.loginButton).click()
    cy.get(loginSignUpPages.loginEmailInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill email, then check password is required
    cy.get(loginSignUpPages.loginEmailInput).type(loginSignUpConsts.email)
    cy.get(loginSignUpPages.loginButton).click()
    cy.get(loginSignUpPages.loginPasswordInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill password and login successfully
    cy.get(loginSignUpPages.loginPasswordInput).type(loginSignUpConsts.password)
    cy.get(loginSignUpPages.loginButton).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.contains(`Logged in as ${loginSignUpConsts.username}`).should('be.visible')
  })

  it('Login - validate email format', () => {
    cy.navigateToLoginForm()
    // Invalid email format without @
    cy.get(loginSignUpPages.loginEmailInput).type(loginSignUpConsts.invalidEmail)
    cy.get(loginSignUpPages.loginPasswordInput).type(loginSignUpConsts.password)
    cy.get(loginSignUpPages.loginButton).click()
    cy.get(loginSignUpPages.loginEmailInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.emailValidationPattern, 'i'))
    })
    // Valid email format
    cy.get(loginSignUpPages.loginEmailInput).clear().type(loginSignUpConsts.email)
    cy.get(loginSignUpPages.loginPasswordInput).clear().type(loginSignUpConsts.password)
    cy.get(loginSignUpPages.loginButton).click()
    cy.url().should('not.eq', `${Cypress.config().baseUrl}login`)
  })

  it('Login - validate password is correct', () => {
    cy.navigateToLoginForm()
    // Login with wrong password
    cy.get(loginSignUpPages.loginEmailInput).type(loginSignUpConsts.email)
    cy.get(loginSignUpPages.loginPasswordInput).type(loginSignUpConsts.wrongPassword)
    cy.get(loginSignUpPages.loginButton).click()
    cy.contains(loginSignUpMessages.incorrectEmailOrPassword).should('be.visible')
    // Login with correct password
    cy.get(loginSignUpPages.loginEmailInput).clear().type(loginSignUpConsts.email)
    cy.get(loginSignUpPages.loginPasswordInput).clear().type(loginSignUpConsts.password)
    cy.get(loginSignUpPages.loginButton).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.contains(`Logged in as ${loginSignUpConsts.username}`).should('be.visible')
  })

  it('Logout successfully', () => {
    cy.navigateToLoginForm()
    cy.get(loginSignUpPages.loginEmailInput).type(loginSignUpConsts.email)
    cy.get(loginSignUpPages.loginPasswordInput).type(loginSignUpConsts.password)
    cy.get(loginSignUpPages.loginButton).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.contains(`Logged in as ${loginSignUpConsts.username}`).should('be.visible')
    cy.get(globalPages.logout).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}login`)
    cy.contains(`Logged in as ${loginSignUpConsts.username}`).should('not.exist')
  })

  it('Delete account successfully', () => {
    cy.navigateToLoginForm()
    cy.get(loginSignUpPages.loginEmailInput).type(loginSignUpConsts.email)
    cy.get(loginSignUpPages.loginPasswordInput).type(loginSignUpConsts.password)
    cy.get(loginSignUpPages.loginButton).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.contains(`Logged in as ${loginSignUpConsts.username}`).should('be.visible')
    cy.get(globalPages.deleteAccount).click()
    cy.url().should('include', '/delete_account')
    cy.contains(loginSignUpMessages.accountDeleted).should('be.visible')
  })
})