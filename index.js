const taxLookup = require("./tax-lookup.json")

function prepShoppingCartPayload (amount, importDuty, item, itemPrice) {
  if (!amount && itemPrice === 0){
    return `The selected product "${item}" is not in our product range`
  } else {
    return (importDuty ? `${amount} imported ${item}: ${itemPrice}` : `${amount} ${item}: ${itemPrice}`)
  }
}

function calcTotalPriceInclTaxes (goodieBox) {
  let importDuty = 0
  let basicSalesTaxes = 0
  let itemTaxes = 0
  let price = 0
  let itemTotalPrice = 0
  let total = 0
  let salesTaxes = 0
  let receipt = {
    shoppingCart: {},
    unavailableProducts: {}
  }

  for (goodie in goodieBox.goods) {
    if (!taxLookup.goods[goodieBox.goods[goodie].item]) {
      basicSalesTaxes += 0
    } else if (taxLookup.goods[goodieBox.goods[goodie].item].basic) {
      basicSalesTaxes += goodieBox.goods[goodie].price * taxLookup.taxes.basic
      basicSalesTaxes = Math.round(basicSalesTaxes * 100) / 100
    }

    if (goodieBox.goods[goodie].import) {
      importDuty += goodieBox.goods[goodie].price * taxLookup.taxes.import
      importDuty = Math.round(importDuty * 10) / 10
    }

    if (!taxLookup.goods[goodieBox.goods[goodie].item]) {
      receipt.unavailableProducts[goodie] = prepShoppingCartPayload(
        0,
        false,
        goodieBox.goods[goodie].item,
        0
      )
    } else {
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

      receipt.shoppingCart[goodie] = prepShoppingCartPayload(
        goodieBox.goods[goodie].amount,
        goodieBox.goods[goodie].import,
        taxLookup.goods[goodieBox.goods[goodie].item].name,
        strItemTotalPrice
      )
    }

    basicSalesTaxes = 0
    importDuty = 0
    itemTotalPrice = 0
  }

  receipt["Sales Taxes"] = salesTaxes
  receipt["Total"] = total

  return receipt
}

module.exports = calcTotalPriceInclTaxes
