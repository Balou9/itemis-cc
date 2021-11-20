const tape = require("tape")
const calcTotalPriceInclTaxes = require("./index.js")
const shoppingBox1 = {
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

const shoppingBox2 = {
  goods: {
    "001": {
      item: "chocolateBox",
      amount: 1,
      price: 10,
      import: true
    },
    "002": {
      item: "perfumeBottle",
      amount: 1,
      price: 47.5,
      import: true
    }
  }
}

const shoppingBox3 = {
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

tape("Calculates sales Taxes and total price", (t) => {
  const result1 = calcTotalPriceInclTaxes(shoppingBox1)
  const result2 = calcTotalPriceInclTaxes(shoppingBox2)
  const result3 = calcTotalPriceInclTaxes(shoppingBox3)
  t.equal(result1.taxes, 1.50)
  t.equal(result1.totalPrice, 29.83)
  t.equal(result2.taxes, 7.65)
  t.equal(result2.totalPrice, 65.15)
  t.equal(result3.taxes, 6.70)
  t.equal(result3.totalPrice, 74.68)
  t.end()
})
