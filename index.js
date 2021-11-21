const taxLookup = require("./tax-lookup.json")

function calcpriceInclTaxes (goodieBox) {
  let importDuty = 0
  let salesTaxes = 0
  let payload = {
    totalPrice: 0,
    price: 0,
    taxes: 0
  }

  for (goodie in goodieBox.goods) {
    if (taxLookup.goods[goodieBox.goods[goodie].item].basic) {
      salesTaxes += goodieBox.goods[goodie].price * taxLookup.taxes.basic
      salesTaxes = Math.round(salesTaxes * 100) / 100
    }
    if (goodieBox.goods[goodie].import) {
      importDuty += goodieBox.goods[goodie].price * taxLookup.taxes.import
      importDuty = Math.round(importDuty * 10) / 10
    }
    payload.price += goodieBox.goods[goodie].amount * goodieBox.goods[goodie].price
    payload.price = Math.round(payload.price * 100) / 100
  }

  payload.taxes = salesTaxes + importDuty

  payload.totalPrice = payload.price + payload.taxes

  return payload
}

module.exports = calcpriceInclTaxes
