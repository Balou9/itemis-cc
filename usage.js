const calcTotalPriceInclTaxes = require("./index.js")
const {
  shoppingBasket1,
  shoppingBasket2,
  shoppingBasket3,
  shoppingBasket4,
  shoppingBasket5
} = require("./utils/sampleShoppingBasket.js")

const result = calcTotalPriceInclTaxes(shoppingBasket2)

console.log(result)
