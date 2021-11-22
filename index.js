const taxLookup = require("./tax-lookup.json")

function prepShoppingCartPayload (amount, importDuty, item, itemPrice) {
  return (importDuty ? `${amount} imported ${item}: ${itemPrice}` : `${amount} ${item}: ${itemPrice}` )
}

function calcTotalPriceInclTaxes (goodieBox) {
  let importDuty = 0
  let basicSalesTaxes = 0
  let itemTaxes = 0
  let price = 0
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
    } else {
      basicSalesTaxes += 0
    }

    if (goodieBox.goods[goodie].import) {
      importDuty += goodieBox.goods[goodie].price * taxLookup.taxes.import
      importDuty = Math.round(importDuty * 10) / 10
    }

    itemTaxes = importDuty + basicSalesTaxes
    itemTaxes = parseFloat(itemTaxes.toFixed(2))

    salesTaxes += itemTaxes
    salesTaxes = parseFloat(salesTaxes.toFixed(2))

    price = goodieBox.goods[goodie].amount * goodieBox.goods[goodie].price
    price = parseFloat(price.toFixed(2))

    itemTotalPrice = itemTaxes + price
    itemTotalPrice = parseFloat(itemTotalPrice.toFixed(2))

    total += itemTotalPrice
    total = parseFloat(total.toFixed(2))

    strItemTotalPrice = itemTotalPrice.toFixed(2)
    payload.shoppingCart[goodie] = prepShoppingCartPayload(
      goodieBox.goods[goodie].amount,
      goodieBox.goods[goodie].import,
      taxLookup.goods[goodieBox.goods[goodie].item].name,
      strItemTotalPrice
    )

    basicSalesTaxes = 0
    importDuty = 0
    itemTotalPrice = 0
  }

  payload["Sales Taxes"] = salesTaxes
  payload["Total"] = total

  return payload
}

module.exports = calcTotalPriceInclTaxes
