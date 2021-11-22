[![ci](https://github.com/Balou9/itemis-cc/workflows/ci/badge.svg)](https://github.com/Balou9/itemis-cc/actions/workflows/ci.yml)

# Task

## Sales Taxes  

Basic‌ ‌sales‌ ‌tax‌ ‌is‌ ‌applicable‌ ‌at‌ ‌a‌ ‌rate‌ ‌of‌ ‌10%‌ ‌on‌ all‌ ‌goods,‌ ‌except‌ ‌books,‌ ‌food,‌ ‌and‌ ‌medical‌‌ products‌ ‌that‌ ‌are‌ ‌exempt.‌ ‌Import‌ ‌duty‌ ‌is‌ ‌an‌ ‌additional‌ ‌sales‌ ‌tax‌ ‌applicable‌ ‌on‌ ‌all‌ ‌imported‌ ‌goods‌ ‌at‌ ‌a‌ ‌rate‌ ‌of‌ ‌5%,‌ ‌with‌ ‌no‌ ‌exemptions.‌ ‌When‌ ‌I‌ ‌purchase‌ ‌items‌‌ I‌ ‌receive‌ ‌a‌ ‌receipt‌ ‌which‌ ‌lists‌ ‌the‌ ‌name‌ ‌of‌ ‌all‌ ‌the‌ ‌items‌ ‌and‌ ‌their‌ ‌price‌ ‌(including‌ ‌tax),‌‌ finishing‌ ‌with‌ ‌the‌ ‌total‌ ‌cost‌ ‌of‌ ‌the‌ ‌items,‌ ‌and‌ ‌the‌ ‌total‌ ‌amounts‌ ‌of‌ ‌sales‌ ‌taxes‌ ‌paid.‌ **‌The‌ ‌rounding‌ ‌rules‌ ‌for‌ ‌sales‌ ‌tax‌ ‌are‌ ‌that‌ ‌for‌ ‌a‌ ‌tax‌‌ rate‌ ‌of‌ ‌n%,‌ ‌a‌ ‌shelf‌ ‌price‌ ‌of‌ ‌p‌ ‌contains‌ ‌(np/100‌ ‌rounded‌ ‌up‌ ‌to‌ ‌the‌ ‌nearest‌ ‌0.05)‌ ‌amount‌ ‌of‌‌ sales‌ ‌tax.**‌ ‌
‌
Write‌ ‌an‌ ‌application‌ ‌that‌ ‌prints‌ ‌out‌ ‌the‌ ‌receipt‌ ‌details‌ ‌for‌ ‌these‌ ‌shopping‌ ‌baskets...‌ ‌

## Usage

### Setup

First clone the repo.
```
git clone https://github.com/Balou9/itemis-cc
```
Afterwards navigate to the project directory and install required dependencies.

```
cd itemis-cc && npm i
```

### Run Example

The main function is declared in the [index.js](https://github.com/Balou9/itemis-cc/blob/main/index.js) file. To use this function it can be imported like in the following example. The example is provided in the [usage.js](https://github.com/Balou9/itemis-cc/blob/main/usage.js) file.  
Simply run ...
```
node usage
```
from the repository directory.


The following example is a copy of the [usage.js](https://github.com/Balou9/itemis-cc/blob/main/usage.js) file.
```
const {
  shoppingBasket1,
  shoppingBasket2
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
//   unavailableProducts: {},
//   'Sales Taxes': 7.65,
//   Total: 65.15
// }
```

## CI Workflow

### Test cases

- **Calculates sales taxes and total price**  
- **Does not calculate sales taxes and total price for unavailable products**  
- **Does calculate for available products, even if the shopping basket contains unavailable products**
