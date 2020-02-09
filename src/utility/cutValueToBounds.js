const directions = require('../constants/directions')
const bounds = require('../constants/spaceBounds')

const cutHorizontalValue = val => Math.max(Math.min(val, bounds.MAX_X), bounds.MIN_X)
const cutVerticalValue = val => Math.max(Math.min(val, bounds.MAX_Y), bounds.MIN_Y)

const cutValueToBounds = (dir, value) => ({
  [directions.HORIZONTAL]: cutHorizontalValue,
  [directions.VERTICAL]: cutVerticalValue
})[dir](value)

module.exports = cutValueToBounds