const operators = require('../constants/operators')
const add = (l, r) => l + r
const substract = (l, r) => l - r

const operation = op => {
  return ({
    [operators.ADD]: add,
    [operators.SUBSTRACT]: substract
  })[op]
}

module.exports = operation