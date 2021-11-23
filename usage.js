const {
  shoppingBasket1,
  shoppingBasket2,
  shoppingBasket3
} = require("./utils/sampleShoppingBasket.js")
const calcTotalPriceInclTaxes = require("./index.js")

const receipt1 = calcTotalPriceInclTaxes(shoppingBasket1)
console.log(receipt1)

const receipt2 = calcTotalPriceInclTaxes(shoppingBasket2)
console.log(receipt2)

const receipt3 = calcTotalPriceInclTaxes(shoppingBasket3)
console.log(receipt3)
