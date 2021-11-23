const tape = require("tape")
const calcTotalPriceInclTaxes = require("./index.js")
const {
  shoppingBasket1,
  shoppingBasket2,
  shoppingBasket3,
  shoppingBasket4,
  shoppingBasket5
} = require("./utils/sampleShoppingBasket.js")

tape("Calculates sales taxes and total price", (t) => {
  const receipt1 = calcTotalPriceInclTaxes(shoppingBasket1)
  t.equal(Object.keys(receipt1.shoppingCart).length, 3, "test if the number of products in the shopping cart has the expected value")
  t.equal(receipt1.shoppingCart["001"], "1 book: 12.49", "test if the product price equals the expected value")
  t.equal(receipt1.shoppingCart["002"], "1 music CD: 16.49", "test if the product price equals the expected value")
  t.equal(receipt1.shoppingCart["003"], "1 chocolate bar: 0.85", "test if the product price equals the expected value")
  t.equal(receipt1["Sales Taxes"], 1.50, "test if the sales taxes equals the expected value")
  t.equal(receipt1["Total"], 29.83, "test if the total price equals the expected value")

  const receipt2 = calcTotalPriceInclTaxes(shoppingBasket2)
  t.equal(Object.keys(receipt2.shoppingCart).length, 2, "test if the number of products in the shopping cart has the expected value")
  t.equal(receipt2.shoppingCart["001"], "1 imported box of chocolates: 10.50", "test if the product price equals the expected value")
  t.equal(receipt2.shoppingCart["002"], "1 imported bottle of perfume: 54.65", "test if the product price equals the expected value")
  t.equal(receipt2["Sales Taxes"], 7.65, "test if the sales taxes equals the expected value")
  t.equal(receipt2["Total"], 65.15, "test if the total price equals the expected value")

  const receipt3 = calcTotalPriceInclTaxes(shoppingBasket3)
  t.equal(Object.keys(receipt3.shoppingCart).length, 4, "test if the number of products in the shopping cart has the expected value")
  t.equal(receipt3.shoppingCart["001"], "1 imported bottle of perfume: 32.19", "test if the product price equals the expected value")
  t.equal(receipt3.shoppingCart["002"], "1 bottle of perfume: 20.89", "test if the product price equals the expected value")
  t.equal(receipt3.shoppingCart["003"], "1 packet of headache pills: 9.75", "test if the product price equals the expected value")
  t.equal(receipt3.shoppingCart["004"], "1 imported box of chocolates: 11.85", "test if the product price equals the expected value")
  t.equal(receipt3["Sales Taxes"], 6.70, "test if the sales taxes equals the expected value")
  t.equal(receipt3["Total"], 74.68, "test if the total price equals the expected value")
  t.end()
})

tape("Does not calculate sales taxes and total price for unavailable products", (t) => {
  const receipt = calcTotalPriceInclTaxes(shoppingBasket4)
  t.equal(Object.keys(receipt.unavailableProducts).length, 1, "test if the number of unavailable products is as expected")
  t.equal(Object.keys(receipt.shoppingCart).length, 0, "test if the shopping cart is empty")
  t.equal(receipt.unavailableProducts["001"], 'The selected product "football" is not in our product range', "test if the unavailable product information is as expected")
  t.equal(receipt["Sales Taxes"], 0, "test if the sales taxes equals zero")
  t.equal(receipt["Total"], 0, "test if the total price equals zero")
  t.end()
})

tape("Does calculate for available products, even if the shopping basket contains unavailable products", (t) => {
  const receipt = calcTotalPriceInclTaxes(shoppingBasket5)
  t.equal(Object.keys(receipt.unavailableProducts).length, 1, "test if the number of unavailable products has the expected value")
  t.equal(Object.keys(receipt.shoppingCart).length, 1, "test if the shopping cart has the expected number of products")
  t.equal(receipt.unavailableProducts["001"], 'The selected product "football" is not in our product range', "test if the unavailable product information is as expected")
  t.equal(receipt.shoppingCart["002"], "1 imported box of chocolates: 11.85", "test if the product price equals the expected value")
  t.equal(receipt["Sales Taxes"], 0.6, "test if the sales taxes equals the expected value")
  t.equal(receipt["Total"], 11.85, "test if the total price equals the expected value")
  t.end()
})
