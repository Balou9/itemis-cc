const taxLookup = require("./tax-lookup.json")

function prepShoppingCartPayload (amount, importDuty, item, itemPrice) {
  return (importDuty ? `${amount} imported ${item}: ${itemPrice}` : `${amount} ${item}: ${itemPrice}` )
}

function calcTotalPriceInclTaxes (goodieBox) {
  let importDuty = 0
  let basicSalesTaxes = 0
  let price = 0
  let taxes = 0
  let itemTotalPrice = 0
  let total = 0
  let salesTaxes = 0
  let payload = {
    shoppingCart: {}
  }

  for (goodie in goodieBox.goods) {
    if (taxLookup.goods[goodieBox.goods[goodie].item].basic) {
      basicSalesTaxes += goodieBox.goods[goodie].price * taxLookup.taxes.basic
      basicSalesTaxes = Math.round(basicSalesTaxes * 100) / 100
    }

    if (goodieBox.goods[goodie].import) {
      importDuty += goodieBox.goods[goodie].price * taxLookup.taxes.import
      importDuty = Math.round(importDuty * 10) / 10
    }

    taxes = importDuty + basicSalesTaxes
    taxes = Math.round(taxes * 100) / 100

    price = goodieBox.goods[goodie].amount * goodieBox.goods[goodie].price
    price = Math.round(price * 100) / 100

    itemTotalPrice = taxes + price
    itemTotalPrice = Math.round(itemTotalPrice * 100) / 100

    total += itemTotalPrice
    total = Math.round(total * 100) / 100

    salesTaxes += taxes
    salesTaxes = Math.round(salesTaxes * 100) / 100

    payload.shoppingCart[goodie] = prepShoppingCartPayload(
      goodieBox.goods[goodie].amount,
      goodieBox.goods[goodie].import,
      taxLookup.goods[goodieBox.goods[goodie].item].name,
      itemTotalPrice
    )

    basicSalesTaxes = 0
    importDuty = 0
    itemTotalPrice = 0
  }

  payload["Sales Taxes"] = salesTaxes.toFixed(2)
  payload["Total"] = total.toFixed(2)

  return payload
}

module.exports = calcTotalPriceInclTaxes
