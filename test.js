const tape = require("tape")
const calcTotalPriceInclTaxes = require("./index.js")
const shoppingBasket1 = {
  goods: {
    "001": {
      item: "book",
      amount: 1,
      price: 12.49,
      import: false
    },
    "002": {
      item: "musicCD",
      amount: 1,
      price: 14.99,
      import: false
    },
    "003": {
      item: "chocolateBar",
      amount: 1,
      price: 0.85,
      import: false
    }
  }
}

const shoppingBasket2 = {
  goods: {
    "001": {
      item: "chocolateBox",
      amount: 1,
      price: 10.00,
      import: true
    },
    "002": {
      item: "perfumeBottle",
      amount: 1,
      price: 47.50,
      import: true
    }
  }
}

const shoppingBasket3 = {
  goods: {
    "001": {
      item: "perfumeBottle",
      amount: 1,
      price: 27.99,
      import: true
    },
    "002": {
      item: "perfumeBottle",
      amount: 1,
      price: 18.99,
      import: false
    },
    "003": {
      item: "headachePills",
      amount: 1,
      price: 9.75,
      import: false
    },
    "004": {
      item: "chocolateBox",
      amount: 1,
      price: 11.25,
      import: true
    }
  }
}

const shoppingBasket4 = {
  goods: {
    "001": {
      item: "football",
      amount: 2,
      price: 5.99,
      import: false
    }
  }
}

tape("Calculates sales Taxes and total price", (t) => {
  const result1 = calcTotalPriceInclTaxes(shoppingBasket1)
  const result2 = calcTotalPriceInclTaxes(shoppingBasket2)
  const result3 = calcTotalPriceInclTaxes(shoppingBasket3)
  t.assert(result1.shoppingCart)
  t.equal(result1.shoppingCart["001"], "1 book: 12.49")
  t.equal(result1.shoppingCart["002"], "1 music CD: 16.49")
  t.equal(result1.shoppingCart["003"], "1 chocolate bar: 0.85")
  t.equal(result1.shoppingCart["004"], undefined)
  t.equal(result1["Sales Taxes"], 1.50)
  t.equal(result1["Total"], 29.83)
  t.assert(result2.shoppingCart)
  t.equal(result2.shoppingCart["001"], "1 imported box of chocolates: 10.50")
  t.equal(result2.shoppingCart["002"], "1 imported bottle of perfume: 54.65")
  t.equal(result2.shoppingCart["003"], undefined)
  t.equal(result2["Sales Taxes"], 7.65)
  t.equal(result2["Total"], 65.15)
  t.assert(result3.shoppingCart)
  t.equal(result3.shoppingCart["001"], "1 imported bottle of perfume: 32.19")
  t.equal(result3.shoppingCart["002"], "1 bottle of perfume: 20.89")
  t.equal(result3.shoppingCart["003"], "1 packet of headache pills: 9.75")
  t.equal(result3.shoppingCart["004"], "1 imported box of chocolates: 11.85")
  t.equal(result3.shoppingCart["005"], undefined)
  t.equal(result3["Sales Taxes"], 6.70)
  t.equal(result3["Total"], 74.68)
  t.end()
})

// tape("Returns empty object if shopping basket contains not available goods", (t) => {
//   const result = calcTotalPriceInclTaxes(shoppingBasket4)
//   t.equal(result)
// })
