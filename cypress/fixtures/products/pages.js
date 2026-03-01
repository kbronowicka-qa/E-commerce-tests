export const productsPages = {
  // Products list page
  productsList: '.features_items',
  productItem: '.product-image-wrapper',
  viewProductButton: 'a[href*="/product/"]',
  searchInput: '#search_product',
  searchButton: '#submit_search',
  searchedProductsTitle: 'h2',
  
  // Product detail page
  productName: '.product-information > h2',
  productCategory: 'p:contains("Category")',
  productPrice: ':nth-child(5) > span',
  productAvailability: 'p:contains("Availability")',
  productCondition: 'p:contains("Condition")',
  productBrand: 'p:contains("Brand")',
  
  // Categories sidebar
  categoriesSidebar: '.left-sidebar',
  categorySection: '.panel-heading',
  womenCategory: 'a[href="#Women"]',
  menCategory: 'a[href="#Men"]',
  womenDressSubcategory: 'a[href="/category_products/1"]',
  menTopsSubcategory: 'a[href="/category_products/3"]',
  categoryTitle: 'h2.title',
  
  // Brands sidebar
  brandsSidebar: '.left-sidebar',
  brandLink: 'a[href*="/brand_products/"]',
  brandTitle: 'h2.title',
  
  // Cart page
  addToCartButton: 'a.btn-default:contains("Add to cart")',
  cartButton: 'a[href="/view_cart"]',
  cartTable: '.table-responsive',
  cartProduct: '.cart_product',
  proceedCheckoutButton: 'a.btn-default:contains("Proceed To Checkout")',
  
  // Checkout page
  checkoutAddressForm: '.form-group textarea',
  checkoutCommentTextarea: 'textarea[name="message"]',
  placeOrderButton: 'a.btn-default:contains("Place Order")',
  paymentOption: 'input[name="payment_option"]',
  payButton: 'button:contains("Pay")',
  orderConfirmationMessage: '.order-confirmed',
  orderSuccessMessage: 'h2:contains("Order Placed Successfully")',
  
  // Product review
  writeReviewButton: 'a[href*="#reviews"]',
  reviewNameInput: '#name',
  reviewEmailInput: '#email',
  reviewTextarea: '#review',
  submitReviewButton: '#button-review',
  reviewSuccessMessage: '.alert-success'
}
