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
  const result1 = calcTotalPriceInclTaxes(shoppingBasket1)
  t.equal(Object.keys(result1.shoppingCart).length, 3)
  t.equal(result1.shoppingCart["001"], "1 book: 12.49")
  t.equal(result1.shoppingCart["002"], "1 music CD: 16.49")
  t.equal(result1.shoppingCart["003"], "1 chocolate bar: 0.85")
  t.equal(result1["Sales Taxes"], 1.50)
  t.equal(result1["Total"], 29.83)

  const result2 = calcTotalPriceInclTaxes(shoppingBasket2)
  t.equal(Object.keys(result2.shoppingCart).length, 2)
  t.equal(result2.shoppingCart["001"], "1 imported box of chocolates: 10.50")
  t.equal(result2.shoppingCart["002"], "1 imported bottle of perfume: 54.65")
  t.equal(result2["Sales Taxes"], 7.65)
  t.equal(result2["Total"], 65.15)

  const result3 = calcTotalPriceInclTaxes(shoppingBasket3)
  t.equal(Object.keys(result3.shoppingCart).length, 4)
  t.equal(result3.shoppingCart["001"], "1 imported bottle of perfume: 32.19")
  t.equal(result3.shoppingCart["002"], "1 bottle of perfume: 20.89")
  t.equal(result3.shoppingCart["003"], "1 packet of headache pills: 9.75")
  t.equal(result3.shoppingCart["004"], "1 imported box of chocolates: 11.85")
  t.equal(result3["Sales Taxes"], 6.70)
  t.equal(result3["Total"], 74.68)
  t.end()
})

tape("Does not calculate sales taxes and total price for unavailable products", (t) => {
  const result = calcTotalPriceInclTaxes(shoppingBasket4)
  t.equal(Object.keys(result.unavailableProducts).length, 1)
  t.equal(Object.keys(result.shoppingCart).length, 0)
  t.equal(result.unavailableProducts["001"], 'The selected product "football" is not in our product range')
  t.equal(result["Sales Taxes"], 0)
  t.equal(result["Total"], 0)
  t.end()
})

tape("Does calculate for available products, even if the shopping basket contains unavailable products", (t) => {
  const result = calcTotalPriceInclTaxes(shoppingBasket5)
  t.equal(Object.keys(result.unavailableProducts).length, 1)
  t.equal(Object.keys(result.shoppingCart).length, 1)
  t.equal(result.unavailableProducts["001"], 'The selected product "football" is not in our product range')
  t.equal(result.shoppingCart["002"], "1 imported box of chocolates: 11.85")
  t.equal(result["Sales Taxes"], 0.6)
  t.equal(result["Total"], 11.85)
  t.end()
})
