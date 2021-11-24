[![ci](https://github.com/Balou9/itemis-cc/workflows/ci/badge.svg)](https://github.com/Balou9/itemis-cc/actions/workflows/ci.yml)

# Task

## Sales Taxes  

Basic‌ ‌sales‌ ‌tax‌ ‌is‌ ‌applicable‌ ‌at‌ ‌a‌ ‌rate‌ ‌of‌ ‌10%‌ ‌on‌ all‌ ‌goods,‌ ‌except‌ ‌books,‌ ‌food,‌ ‌and‌ ‌medical‌‌ products‌ ‌that‌ ‌are‌ ‌exempt.‌ ‌Import‌ ‌duty‌ ‌is‌ ‌an‌ ‌additional‌ ‌sales‌ ‌tax‌ ‌applicable‌ ‌on‌ ‌all‌ ‌imported‌ ‌goods‌ ‌at‌ ‌a‌ ‌rate‌ ‌of‌ ‌5%,‌ ‌with‌ ‌no‌ ‌exemptions.‌ ‌When‌ ‌I‌ ‌purchase‌ ‌items‌‌ I‌ ‌receive‌ ‌a‌ ‌receipt‌ ‌which‌ ‌lists‌ ‌the‌ ‌name‌ ‌of‌ ‌all‌ ‌the‌ ‌items‌ ‌and‌ ‌their‌ ‌price‌ ‌(including‌ ‌tax),‌‌ finishing‌ ‌with‌ ‌the‌ ‌total‌ ‌cost‌ ‌of‌ ‌the‌ ‌items,‌ ‌and‌ ‌the‌ ‌total‌ ‌amounts‌ ‌of‌ ‌sales‌ ‌taxes‌ ‌paid.‌ ‌The‌ ‌rounding‌ ‌rules‌ ‌for‌ ‌sales‌ ‌tax‌ ‌are‌ ‌that‌ ‌for‌ ‌a‌ ‌tax‌‌ rate‌ ‌of‌ ‌n%,‌ ‌a‌ ‌shelf‌ ‌price‌ ‌of‌ ‌p‌ ‌contains‌ ‌(np/100‌ ‌rounded‌ ‌up‌ ‌to‌ ‌the‌ ‌nearest‌ ‌0.05)‌ ‌amount‌ ‌of‌‌ sales‌ ‌tax.
‌
Write‌ ‌an‌ ‌application‌ ‌that‌ ‌prints‌ ‌out‌ ‌the‌ ‌receipt‌ ‌details‌ ‌for‌ ‌these‌ ‌shopping‌ ‌baskets...‌ ‌

# Solution

```js
calcTotalPriceInclTaxes(shoppingBasket)
```

The main function is declared in the [index.js](https://github.com/Balou9/itemis-cc/blob/main/index.js) file. To use this function it can be imported like in the following example. The function takes a shopping basket as an input and returns a receipt object.
The receipt object holds a shopping cart containing all products and their costs including sales taxes. Additionally the overall sales taxes and the total price are also being presented.

The following feature was not mandatory.
If the shopping basket accidently contains a product which is not part of the product store,
the receipt returns an information text instead of the product cost.  

## Usage

### Setup

It is assumed that git and npm are already installed.

- First clone the repo.

```sh
git clone https://github.com/Balou9/itemis-cc
```
- Afterwards navigate to the project directory and install required dependencies.

```sh
cd itemis-cc && npm i
```

### Run Example

The example is provided in the [usage.js](https://github.com/Balou9/itemis-cc/blob/main/usage.js) file.  
Simply run ...
```sh
node usage
```
from the repository directory.

The following example is a copy of the [usage](https://github.com/Balou9/itemis-cc/blob/main/usage.js) file.
```js
const {
  shoppingBasket1,
  shoppingBasket2,
  shoppingBasket3
} = require("./utils/sampleShoppingBasket.js")
const calcTotalPriceInclTaxes = require("./index.js")

const receipt1 = calcTotalPriceInclTaxes(shoppingBasket1)
console.log(receipt1)
// {
//   shoppingCart: {
//     '001': '1 book: 12.49',
//     '002': '1 music CD: 16.49',
//     '003': '1 chocolate bar: 0.85'
//   },
//   'Sales Taxes': 1.5,
//   Total: 29.83
// }

const receipt2 = calcTotalPriceInclTaxes(shoppingBasket2)
console.log(receipt2)
// {
//   shoppingCart: {
//     '001': '1 imported box of chocolates: 10.50',
//     '002': '1 imported bottle of perfume: 54.65'
//   },
//   'Sales Taxes': 7.65,
//   Total: 65.15
// }

const receipt3 = calcTotalPriceInclTaxes(shoppingBasket3)
console.log(receipt3)
// {
//   shoppingCart: {
//     '001': '1 imported bottle of perfume: 32.19',
//     '002': '1 bottle of perfume: 20.89',
//     '003': '1 packet of headache pills: 9.75',
//     '004': '1 imported box of chocolates: 11.85'
//   },
//   'Sales Taxes': 6.7,
//   Total: 74.68
// }
```

## CI Workflow

The [ci](https://github.com/Balou9/itemis-cc/actions/workflows/ci.yml) workflow gets triggered on push commits to the main branch. The [ci.yml](https://github.com/Balou9/itemis-cc/blob/main/.github/workflows/ci.yml) consists of a `test` job which runs the test cases.

### Test cases

The test cases are defined in the [test.js](https://github.com/Balou9/itemis-cc/blob/main/test.js) file.
The shopping baskets which will serve as test inputs are defined in the [sampleShoppingBasket.js](https://github.com/Balou9/itemis-cc/blob/main/utils/sampleShoppingBasket.js) file.

---

#### Calculates sales taxes and total price  

This test case uses the shopping baskets 1 to 3 as provided in the example as an input. It runs the test with the following assertions for each shopping basket.

**Tests assertions:**

- test if the number of products in the shopping cart has the expected value
- test if the product price equals the expected value
- test if the sales taxes equals the expected value
- test if the total price equals the expected value

---

#### Does not calculate sales taxes and total price for unavailable products

This test case uses the shopping basket 4 containing one unavailable product as an input.

**Tests assertions:**

- test if the number of unavailable products is as expected
- test if the shopping cart is empty
- test if the unavailable product information text is as expected
- test if the sales taxes equals zero
- test if the total is zero  

---

#### Does calculate for available products, even if the shopping basket contains unavailable products

This test case uses the shopping basket 5 containing one unavailable and one available product as an input.

**Tests assertions:**

- test if the number of unavailable products has the expected value
- test if the shopping cart has the expected number of products
- test if the unavailable product information text is as expected
- test if the price of the available product equals the expected value
- test if the sales taxes equals the expected value
- test if the total price equals the expected value
