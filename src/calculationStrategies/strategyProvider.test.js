const test = require('ava')
const strategyProvider = require('./strategyProvider')
const strategyNames = require('../constants/calculationStrategies')

test('Verify that strategy provider returns a correct calculation strategy for each supported name',
  t => {
    const bruteForceStrategy = strategyProvider(strategyNames.BRUTE_FORCE)
    t.is(typeof bruteForceStrategy, 'object')
    t.is(bruteForceStrategy.constructor.name, 'bruteForceStrategy')
})

test('Verify that strategy provider returns \'undefined\' in case it is invoked with an invalid strategy name',
  t => {
    const invalidStrategy = strategyProvider(null)
    t.is(invalidStrategy, undefined)
  }
)