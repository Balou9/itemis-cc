const calcTotalPriceInclTaxes = require("./index.js")
const {
  shoppingBasket1,
  shoppingBasket4
} = require("./utils/sampleShoppingBasket.js")

const receipt1 = calcTotalPriceInclTaxes(shoppingBasket1)
console.log(receipt1)

const receipt2 = calcTotalPriceInclTaxes(shoppingBasket4)
console.log(receipt2)
