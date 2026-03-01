import { globalPages } from '../fixtures/global/pages'
import { homepagePages } from '../fixtures/homepage/pages'
import { loginSignUpConstants, loginSignUpMessages } from '../fixtures/loginSignUp/constants'
import { loginSignUpPages } from '../fixtures/loginSignUp/pages'

describe('User registration', () => {
  it('Create user successfully', () => {
    cy.visit('/')
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.get(homepagePages.carousel).should('be.visible') //validate homepage loaded
    cy.get(globalPages.signUpLogin).should('be.visible')
    cy.get(globalPages.signUpLogin).click()
    cy.url().should('eq', 'https://automationexercise.com/login')
    cy.contains('New User Signup!').should('be.visible') //validate login page loaded
    cy.get(loginSignUpPages.signUpNameInput).type(loginSignUpConstants.username)
    cy.get(loginSignUpPages.signUpEmailInput).type(loginSignUpConstants.email)
    cy.get(loginSignUpPages.signUpButton).click()
    cy.url().should('eq', 'https://automationexercise.com/signup')
    cy.contains('Enter Account Information').should('be.visible') //validate signup page loaded
    cy.get(loginSignUpPages.loginForm).should('be.visible')
    cy.get(loginSignUpPages.titleRadioButton).eq(1).click()
    cy.get(loginSignUpPages.passwordInput).type(loginSignUpConstants.password)
    cy.get(loginSignUpPages.dayForm).select('25')
    cy.get(loginSignUpPages.monthForm).select('July')
    cy.get(loginSignUpPages.yearForm).select('1995')
    cy.get(loginSignUpPages.newsletterCheckbox).check()
    cy.get(loginSignUpPages.offersCheckbox).check()
    cy.get(loginSignUpPages.firstNameInput).type(loginSignUpConstants.firstName)
    cy.get(loginSignUpPages.lastNameInput).type(loginSignUpConstants.lastName)
    cy.get(loginSignUpPages.companyInput).type(loginSignUpConstants.companyName)
    cy.get(loginSignUpPages.addressInput).type(loginSignUpConstants.address)
    cy.get(loginSignUpPages.address2Input).type(loginSignUpConstants.addressLine2)
    cy.get(loginSignUpPages.countryForm).select('United States')
    cy.get(loginSignUpPages.stateInput).type(loginSignUpConstants.state)
    cy.get(loginSignUpPages.cityInput).type(loginSignUpConstants.city)
    cy.get(loginSignUpPages.zipCodeInput).type(loginSignUpConstants.zipCode)
    cy.get(loginSignUpPages.phoneNumberInput).type(loginSignUpConstants.phoneNumber)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.accountCreatedMessage).should('contain.text', loginSignUpMessages.accountCreated)
    // Validate user was created via API
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true,
      body: {
        email: loginSignUpConstants.email,
        password: loginSignUpConstants.password
      }
    }).then((response) => {
      expect(response.status).to.equal(200)
      const responseBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      expect(responseBody.message).to.equal('User exists!')
    })
    cy.get(loginSignUpPages.continueButton).click()
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.contains(`Logged in as ${loginSignUpConstants.username}`).should('be.visible')
  });

  it('Validate required fields', () => {
    cy.visit('/')
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.get(homepagePages.carousel).should('be.visible')
    cy.get(globalPages.signUpLogin).should('be.visible').click()
    cy.url().should('eq', 'https://automationexercise.com/login')
    cy.contains('New User Signup!').should('be.visible')
    //Name is required
    cy.get(loginSignUpPages.signUpButton).click()
    cy.get(loginSignUpPages.signUpNameInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    //Fill name, then check email is required
    cy.get(loginSignUpPages.signUpNameInput).type(loginSignUpConstants.username)
    cy.get(loginSignUpPages.signUpButton).click()
    cy.get(loginSignUpPages.signUpEmailInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    //Fill email with invalid format
    cy.get(loginSignUpPages.signUpEmailInput).type(loginSignUpConstants.invalidEmail)
    cy.get(loginSignUpPages.signUpButton).click()
    cy.get(loginSignUpPages.signUpEmailInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.emailValidationPattern, 'i'))
    })
    cy.get(loginSignUpPages.signUpEmailInput).clear().type(loginSignUpConstants.email)
    cy.get(loginSignUpPages.signUpButton).click()
    cy.url().should('eq', 'https://automationexercise.com/signup')
    cy.contains('Enter Account Information').should('be.visible')
    //Password is required
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.passwordInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    //Fill password, then check firstName is required
    cy.get(loginSignUpPages.passwordInput).type(loginSignUpConstants.password)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.firstNameInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    //Fill firstName, then check lastName is required
    cy.get(loginSignUpPages.firstNameInput).type(loginSignUpConstants.firstName)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.lastNameInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    //Fill lastName, then check address is required
    cy.get(loginSignUpPages.lastNameInput).type(loginSignUpConstants.lastName)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.addressInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    //Fill address, then check city is required
    cy.get(loginSignUpPages.addressInput).type(loginSignUpConstants.address)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.cityInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    //Fill city, then check state is required
    cy.get(loginSignUpPages.cityInput).type(loginSignUpConstants.city)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.stateInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    //Fill state, then check zipCode is required
    cy.get(loginSignUpPages.stateInput).type(loginSignUpConstants.state)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.zipCodeInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    //Fill zipCode, then check phoneNumber is required
    cy.get(loginSignUpPages.zipCodeInput).type(loginSignUpConstants.zipCode)
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.phoneNumberInput).then($input => {
      expect($input[0].validationMessage).to.match(new RegExp(loginSignUpMessages.requiredFieldMessage, 'i'))
    })
    // Fill all required fields and verify account can be created
    cy.get(loginSignUpPages.phoneNumberInput).type(loginSignUpConstants.phoneNumber)
    cy.get(loginSignUpPages.titleRadioButton).eq(1).click()
    cy.get(loginSignUpPages.dayForm).select('25')
    cy.get(loginSignUpPages.monthForm).select('July')
    cy.get(loginSignUpPages.yearForm).select('1995')
    cy.get(loginSignUpPages.createAccountButton).click()
    cy.get(loginSignUpPages.accountCreatedMessage).should('contain.text', loginSignUpMessages.accountCreated)
    //validate that user was created via API
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true,
      body: {
        email: loginSignUpConstants.email,
        password: loginSignUpConstants.password
      }
    }).then((response) => {
      expect(response.status).to.equal(200)
      const responseBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
      expect(responseBody.message).to.equal('User exists!')
    })
    cy.get(loginSignUpPages.continueButton).click()
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.contains(`Logged in as ${loginSignUpConstants.username}`).should('be.visible')
  })

    it('Create user - e-mail already exists', () => {
    const user = {
      name: loginSignUpConstants.username,
      email: loginSignUpConstants.email,
      password: loginSignUpConstants.password,
      title: 'Mr',
      birth_date: '25',
      birth_month: 'July',
      birth_year: '1995',
      firstname: loginSignUpConstants.firstName,
      lastname: loginSignUpConstants.lastName,
      company: loginSignUpConstants.companyName,
      address1: loginSignUpConstants.address,
      address2: loginSignUpConstants.addressLine2,
      country: 'United States', 
      zipcode: loginSignUpConstants.zipCode,
      state: loginSignUpConstants.state,
      city: loginSignUpConstants.city,
      mobile_number: loginSignUpConstants.phoneNumber
    };

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true,
      body: user
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      expect(responseBody).to.have.property('message', 'User created!');
    });
    cy.visit('/')
    cy.url().should('eq', 'https://automationexercise.com/')
    cy.get(homepagePages.carousel).should('be.visible')
    cy.get(globalPages.signUpLogin).should('be.visible')
    cy.get(globalPages.signUpLogin).click()
    cy.url().should('eq', 'https://automationexercise.com/login')
    cy.contains('New User Signup!').should('be.visible')
    cy.get(loginSignUpPages.signUpNameInput).should('be.visible')
    cy.get(loginSignUpPages.signUpNameInput).type(loginSignUpConstants.username)
    cy.get(loginSignUpPages.signUpEmailInput).type(loginSignUpConstants.email)
    cy.get(loginSignUpPages.signUpButton).click()
    cy.contains('Email Address already exist!').should('be.visible')
  });
});
