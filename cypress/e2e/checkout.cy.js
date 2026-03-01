
  it.only('Complete Checkout', () => {
    cy.createUserViaAPI(loginSignUpConsts.email, loginSignUpConsts.password, loginSignUpConsts.firstName, loginSignUpConsts.lastName, loginSignUpConsts.username)
    cy.login(loginSignUpConsts.email, loginSignUpConsts.password)
    cy.get(globalPages.products).eq(0).click()
    cy.get(productsPages.searchInput).type(productsConsts.searchTerm)
    cy.get(productsPages.searchButton).click()
    
    // Add product to cart
    cy.addProductToCart(0)
    
    // Go to cart
    cy.get(globalPages.cart).eq(0).click()
    cy.url().should('include', '/view_cart')
    
    // Proceed to checkout
    cy.contains('Proceed To Checkout').click()
    
    // Login on checkout page if prompted
    cy.url().then((url) => {
      if (url.includes('/login')) {
        cy.login()
        // After login, go to cart again and proceed to checkout
        cy.get(globalPages.cart).eq(0).click()
        cy.contains('Proceed To Checkout').click()
      }
    })
    
    // Add delivery address comment
    cy.get(productsPages.checkoutCommentTextarea).type('Please deliver carefully')
    
    // Place order
    cy.contains('Place Order').click()
    
    // Complete payment
    cy.get(productsPages.paymentOption).check({ force: true })
    cy.contains('Pay').click()
    
    // Verify order confirmation
    cy.contains('Congratulations').should('be.visible')
  })