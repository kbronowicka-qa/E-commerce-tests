import { globalPages } from '../fixtures/global/pages'
import { productsPages } from '../fixtures/products/pages'
import { productsConsts, productsMessages } from '../fixtures/products/consts'
import { globalConsts } from '../fixtures/global/consts'
import { loginSignUpConsts } from '../fixtures/loginSignUp/consts'
import { loginSignUpPages } from '../fixtures/loginSignUp/pages'

describe('Products', () => {
  beforeEach(() => {
    cy.visitHomepage()
  })

  afterEach(() => {
    cy.clearCookies()
  })
  it('Verify All Products and product detail page', () => {
    cy.get(globalPages.products).eq(0).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}products`)
    cy.contains(productsMessages.allProductsPageTitle).should('be.visible')
    cy.get(productsPages.productsList).should('be.visible')
    cy.get(productsPages.productItem).should('have.length.greaterThan', 0)
    cy.get(productsPages.productItem).first().within(() => {
      cy.contains('a', productsConsts.viewProduct).click()
    })
    cy.url().should('include', '/product_details/')
    cy.get(productsPages.productName).should('be.visible')
    cy.get(productsPages.productCategory).should('be.visible')
    cy.get(productsPages.productPrice).should('be.visible')
    cy.get(productsPages.productAvailability).should('be.visible')
    cy.get(productsPages.productCondition).should('be.visible')
    cy.get(productsPages.productBrand).should('be.visible')
  })

  it('Search Product', () => {
    cy.get(globalPages.products).eq(0).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}products`)
    cy.contains(productsMessages.allProductsPageTitle).should('be.visible')
    cy.get(productsPages.searchInput).type(productsConsts.searchTerm)
    cy.get(productsPages.searchButton).click()
    cy.contains(productsConsts.searchedProductsTitle).should('be.visible')
    cy.get(productsPages.productsList).should('be.visible')
    cy.get(productsPages.productItem).should('have.length.greaterThan', 0)
  })

  it('Verify categories and navigate to Women - Dress category', () => {
    cy.get(productsPages.categoriesSidebar).should('be.visible')
    cy.contains(productsConsts.womenCategory).should('be.visible')
    cy.contains(productsConsts.menCategory).should('be.visible')
    cy.get(productsPages.womenCategory).click()
    cy.get(productsPages.womenDressSubcategory).click()
    cy.url().should('include', '/category_products/')
    cy.get(productsPages.categoryTitle).should('be.visible')
  })

  it('Verify Men category and navigate to Men - Tops category', () => {
    cy.get(productsPages.categoriesSidebar).should('be.visible')
    cy.get(productsPages.menCategory).click()
    cy.get(productsPages.menTopsSubcategory).click()
    cy.url().should('include', '/category_products/')
    cy.get(productsPages.categoryTitle).should('be.visible')
  })

  it('View Brand Products', () => {
    cy.get(globalPages.products).eq(0).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}products`)
    cy.get(productsPages.brandsSidebar).should('be.visible')
    cy.get(productsPages.brandLink).should('have.length.greaterThan', 0)
    cy.get(productsPages.brandsSidebar).within(() => {
      cy.get(productsPages.brandLink).eq(0).click()
    })
    cy.url().should('include', '/brand_products/')
    cy.get(productsPages.brandTitle).should('be.visible')
    cy.get(productsPages.productsList).should('be.visible')
    cy.get(productsPages.productItem).should('have.length.greaterThan', 0)
    cy.get(globalPages.products).eq(0).click()
    cy.get(productsPages.brandsSidebar).within(() => {
      cy.get(productsPages.brandLink).eq(1).click()
    })
    cy.url().should('include', '/brand_products/')
    cy.get(productsPages.brandTitle).should('be.visible')
    cy.get(productsPages.productsList).should('be.visible')
  })

  it('Search Products and Verify Cart After Login', () => {
    cy.createUserViaAPI(loginSignUpConsts.email, loginSignUpConsts.password, loginSignUpConsts.firstName, loginSignUpConsts.lastName, loginSignUpConsts.username)
    cy.get(globalPages.products).eq(0).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}products`)
    cy.get(productsPages.searchInput).type(productsConsts.searchTerm)
    cy.get(productsPages.searchButton).click()
    cy.contains(productsConsts.searchedProductsTitle).should('be.visible')
    cy.get(productsPages.productsList).should('be.visible')
    cy.get(productsPages.productItem).should('have.length.greaterThan', 0)
    cy.addProductToCart(0)
    cy.get(globalPages.cart).eq(1).click()
    cy.url().should('include', '/view_cart')
    cy.get(productsPages.cartTable).should('be.visible')
    cy.get(productsPages.cartProduct).should('have.length.greaterThan', 0)
    cy.login(loginSignUpConsts.email, loginSignUpConsts.password)
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.get(globalPages.cart).eq(0).click()
    cy.url().should('include', '/view_cart')
    cy.get(productsPages.cartTable).should('be.visible')
    cy.get(productsPages.cartProduct).should('have.length.greaterThan', 0)
    cy.deleteUserViaAPI(loginSignUpConsts.email, loginSignUpConsts.password)
  })

  it('Write Product Review', () => {
    cy.get(globalPages.products).eq(0).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}products`)
    cy.get(productsPages.productItem).first().within(() => {
      cy.contains('a', productsConsts.viewProduct).click()
    })
    cy.url().should('include', '/product_details/')
    cy.contains(productsMessages.writeYourReview).should('be.visible')
    cy.get(productsPages.reviewNameInput).type(productsConsts.reviewerName)
    cy.get(productsPages.reviewEmailInput).type(productsConsts.reviewerEmail)
    cy.get(productsPages.reviewTextarea).type(productsConsts.reviewText)
    cy.get(productsPages.submitReviewButton).click()
    cy.contains(productsMessages.reviewSuccess).should('contain.text', productsMessages.reviewSuccess).and('be.visible')
  })
})
