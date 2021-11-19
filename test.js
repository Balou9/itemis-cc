const tape = require("tape")
const calcTotalPriceInclTaxes = require("./index.js")
const shoppingBox1 = {
  goods: {
    book: {
      amount: 1,
      price: 12.49,
      import: false
    },
    musicCD: {
      amount: 1,
      price: 14.99,
      import: false
    },
    chocolateBar: {
      amount: 1,
      price: 0.85,
      import: false
    }
  }
}

const shoppingBox2 = {
  goods: {
    chocolateBox: {
      amount: 1,
      price: 10.00,
      import: true
    },
    perfumeBottle: {
      amount: 1,
      price: 47.50,
      import: true
    }
  }
}

const shoppingBox3 = {
  goods: {
    perfumeBottle: {
      amount: 1,
      price: 27.99,
      import: true
    },
    perfumeBottle: {
      amount: 1,
      price: 18.99,
      import: false
    },
    headachePills: {
      amount: 1,
      price: 9.75,
      import: false
    },
    chocolateBox: {
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
  t.equal(result1.salesTaxes, 1.50)
  t.equal(result1.totalPrice, 29.83)
  t.equal(result2.salesTaxes, 7.65)
  t.equal(result2.totalPrice, 65.16)
  t.equal(result3.salesTaxes, 6.70)
  t.equal(result3.totalPrice, 74.68)
  t.end()
})
