const directions = require('../constants/directions')
const vertex = require('./vertex')

class edge {
  constructor(startingVertex, dir, length) {
    this._start = startingVertex
    this._dir = directions.toHorizontalOrVertical(dir)
    this._end = startingVertex.newFromExisting(dir, length)
  }

  get start() {
    return this._start
  }

  get end() {
    return this._end
  }

  get direction() {
    return this._dir
  }
}

module.exports = edge