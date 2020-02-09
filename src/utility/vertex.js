const directions = require('../constants/directions')
const operators = require('../constants/operators')
const operations = require('./operations')
const cutValueToBounds = require('./cutValueToBounds')

const directionToOperation = dir => ({
  [directions.EAST]: operations(operators.SUBSTRACT),
  [directions.NORTH]: operations(operators.ADD),
  [directions.SOUTH]: operations(operators.SUBSTRACT),
  [directions.WEST]: operations(operators.ADD)
})[dir]

class vertex {
  constructor(x, y) {
    this._x = cutValueToBounds(directions.HORIZONTAL, x)
    this._y = cutValueToBounds(directions.VERTICAL, y)
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }
  
  newFromExisting(dir, steps) {
    const horizontalOrVertical = directions.toHorizontalOrVertical(dir)
    const operation = directionToOperation(dir)
    if (horizontalOrVertical == directions.HORIZONTAL) {
      const newX = cutValueToBounds(horizontalOrVertical, operation(this.x, steps))
      return new vertex(newX, this.y)
    }
    else {
      const newY = cutValueToBounds(horizontalOrVertical, operation(this.y, steps))
      return new vertex(this.x, newY)
    }
  }
}

module.exports = vertex