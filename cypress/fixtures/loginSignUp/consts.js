import { faker } from '@faker-js/faker'

// Generate constants once to ensure consistent values throughout tests
const generateConstants = () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    addressLine2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode('#####'),
    phoneNumber: faker.string.numeric('##########').replace(/(.{3})(.{3})(.{4})/, '($1) $2-$3'),
    username: faker.internet.username() + faker.string.numeric(6),
    password: faker.internet.password({ length: 6 }),
    email: faker.internet.email(),
    companyName: faker.company.name(),
    // Test form values - hard-coded for consistency
    invalidEmail: 'invalidemail',
    wrongPassword: 'WrongPassword123',
    birthDay: '25',
    birthMonth: 'July',
    birthYear: '1995',
    country: 'United States',
    title: 'Mr'
})

export const loginSignUpConsts = generateConstants()

export const loginSignUpMessages = {
    accountCreated: 'Account Created!',
    accountDeleted: 'Account Deleted!',
    requiredFieldMessage: 'Wypełnij to pole',
    emailValidationPattern: 'Uwzględnij znak.*@.*w adresie e-mail',
    newUserSignUp: 'New User Signup!',
    enterAccountInformation: 'Enter Account Information',
    emailAlreadyExists: 'Email Address already exist!',
    loginToYourAccount: 'Login to your account',
    incorrectEmailOrPassword: 'Your email or password is incorrect!'
}