export const checkoutPages = {
  // Cart page
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
  orderSuccessMessage: 'h2:contains("Order Placed Successfully")'
}
