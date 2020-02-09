const strategyNames = require('../constants/calculationStrategies')
const bruteForceStrategy = require('./bruteForceStrategy')

// Instantiates a calculation strategy of requested type.
const getCalculationStrategy = (name) => ({
  [strategyNames.BRUTE_FORCE]: new bruteForceStrategy()
})[name]

module.exports = getCalculationStrategy
