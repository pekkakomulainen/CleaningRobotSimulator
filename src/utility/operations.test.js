const test = require('ava')
const operators = require('../constants/operators')
const operation = require('./operations')

test('verify that summing of 1 and 2 results in 3',
  t => {
    const sumOperation = operation(operators.ADD)
    const result = sumOperation(1, 2)
    t.is(result, 3)
  })

test('verify that subtracting 2 from 3 results in 1',
  t => {
    const substractionOperation = operation(operators.SUBSTRACT)
    const result = substractionOperation(3, 2)
    t.is(result, 1)
  })
  