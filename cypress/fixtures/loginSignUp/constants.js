import { faker } from '@faker-js/faker'

export const loginSignUpConstants = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    addressLine2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode('#####'),
    phoneNumber: faker.string.numeric('##########').replace(/(.{3})(.{3})(.{4})/, '($1) $2-$3'),
    username: faker.internet.username() + faker.string.numeric(6), // Ensure uniqueness
    password: faker.internet.password({ length: 6 }),
    email: faker.internet.email(),
    companyName: faker.company.name(),
    invalidEmail: 'invalidemail'
}

export const loginSignUpMessages = {
    accountCreated: 'Account Created!',
    accountDeleted: 'Account Deleted!',
    requiredFieldMessage: 'Wypełnij to pole',
    emailValidationPattern: 'Uwzględnij znak.*@.*w adresie e-mail'
}