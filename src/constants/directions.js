const operators = require('./operators')

const isHorizontal = dir => ({
  [this.EAST]: true,
  [this.HORIZONTAL]: true,
  [this.NORTH]: false,
  [this.SOUTH]: false,
  [this.VERTICAL]: false,
  [this.WEST]: true
})[dir]

const directionHorizontalOrVertical = dir => isHorizontal(dir) ? this.HORIZONTAL : this.VERTICAL
const directionToOperator = dir => ({
  [this.EAST]: operators.SUBSTRACT,
  [this.NORTH]: operators.ADD,
  [this.SOUTH]: operators.SUBSTRACT,
  [this.WEST]: operators.ADD
})[dir]

exports.EAST = 'east'
exports.NORTH = 'north'
exports.SOUTH = 'south'
exports.WEST = 'west'
exports.HORIZONTAL = 'horizontal'
exports.VERTICAL = 'vertical'
exports.isHorizontal = isHorizontal
exports.toHorizontalOrVertical = directionHorizontalOrVertical
exports.directionToOperator = directionToOperator
