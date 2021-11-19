const taxLookup = require("./tax-lookup.json")

function calcpriceInclTaxes (goodieBox) {
  let payload = {
    totalPrice: 0,
    salesTaxes: 0,
    price: 0,
    importDuty: 0
  }

  for (goodie in goodieBox.goods) {
    if (taxLookup.goods[goodie].basic) {
      payload.salesTaxes += goodieBox.goods[goodie].price * taxLookup.taxes.basic
      payload.salesTaxes = Math.round(payload.salesTaxes * 100) / 100
    }
    if (goodieBox.goods[goodie].import) {
      payload.importDuty += goodieBox.goods[goodie].price * taxLookup.taxes.import
      payload.importDuty = Math.round(payload.importDuty * 100) / 100
    }
    payload.price += goodieBox.goods[goodie].amount * goodieBox.goods[goodie].price
    payload.price = Math.round(payload.price * 100) / 100
  }

  payload.totalPrice = payload.price + payload.salesTaxes + payload.importDuty

  return payload
}

module.exports = calcpriceInclTaxes
