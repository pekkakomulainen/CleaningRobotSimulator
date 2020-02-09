const directions = require('../constants/directions')
const operations = require('./operations')
const vertex = require('./vertex')

class edge {
  constructor(startingVertex, dir, steps) {
    this._start = startingVertex
    this._dir = dir
    this._isHorizontal = directions.toHorizontalOrVertical(dir) == directions.HORIZONTAL
      ? true : false
    this._end = startingVertex.newFromExisting(dir, steps)
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

  get isHorizontal() {
    return this._isHorizontal;
  }

  get length() {
    let steps = null
    if (this._isHorizontal) {
      steps = this._end.x - this._start.x
    }
    else {
      steps = this._end.y - this._start.y
    }
    steps = (steps >= 0) ? steps : -steps
    return steps + 1
  }

  // Returns vertices along the edge, but omits the start vertice.
  // So for an edge with length 0 returns an empty array
  getVerticesAlongEdge() {
    const operation = operations(directions.directionToOperator(this._dir))
    const resultArray = new Array()
    var x = this._start.x
    var y = this._start.y
    var currentVertex = this._start
    while (currentVertex.isEqual(this._end) === false) {
      if (this._isHorizontal) {
        x = operation(x, 1)
      }
      else {
        y = operation(y, 1)
      }
      currentVertex = new vertex(x, y)
      resultArray.push(currentVertex) // TODO: performance is horrible in case of a long edge
    }

    return resultArray
  }

  // Returns an object with start and end properties if this edge overlaps with otherEdge and null if edges do not overlap.
  // In case of overlap the object with start and end properties is returned. Start is the index of first vertice of
  // current edge that overlaps, and end is the index of last vertice of current edge that overlaps. The index is
  // zero-based.
  getOverlappingVerticesRange(otherEdge) {
    const currentStart = this._getSmallerEndpointVertice()
    const currentEnd = this._getBiggerEndpointVertice()
    const otherStart = otherEdge._getSmallerEndpointVertice()
    const otherEnd = otherEdge._getBiggerEndpointVertice()

    const isOverlappingParallelEdges = (currentStartA, currentEndA, currentB, otherStartA, otherEndA, otherB) => {
      if (currentB !== otherB) {
        return null
      }
      else if (currentStartA > otherEndA || currentEndA < otherStartA) {
        return null
      }
      else {
        // Overlapping edges! Calculate the range of current edge's vertices that overlap
        // the other edge. There may be multiple overlapping vertices in case of parallel edges.
        if (currentStartA >= otherStartA && currentEndA <= otherEndA) {
          // Special case: other edge covers current edge completely. All of current edge's vertices overlap.
          const overlap = { start: 0, end: currentEndA - currentStartA }
          // console.log(`*** isOverlappingParallelEdges - ${JSON.stringify(overlap)}`)
          return overlap
        }
        else {
          // The other edge covers only part of the current edge. Only some of the current edge's vertices overlap.
          const currentLen = currentEndA - currentStartA
          let startIdx = otherStartA - currentStartA
          startIdx = (startIdx < 0) ? 0 : startIdx

          let endIdx = currentLen + otherEndA - currentEndA
          endIdx = (endIdx >= currentLen) ? currentLen : endIdx

          const overlap = { start: startIdx, end: endIdx}
          // console.log(`*** isOverlappingParallelEdges : currentStartA=${currentStartA}, currentEndA=${currentEndA}, currentLen=${currentLen}, overlap=${JSON.stringify(overlap)}`)
          return overlap
        }
      }
    }

    const isOverlappingOrthogonalEdges = (currentStartA, currentEndA, currentB, otherA, otherStartB, otherEndB) => {
      if (currentB > otherEndB || currentB < otherStartB) {
        return null
      }
      else if (currentStartA <= otherA && currentEndA >= otherA) {
        // Overlapping edges! Calculate the index of current edge's overlapping vertex.
        // Only one vertex overlaps in case of orthogonal edges.
        const idx = otherA - currentStartA
        const overlap = { start: idx, end: idx}
        // console.log(`*** isOverlappingOrthogonalEdges - ${JSON.stringify(overlap)}`)
        return overlap
      }
      else {
        return null
      }
    }

    if (this.isHorizontal && otherEdge.isHorizontal) {
      return isOverlappingParallelEdges(currentStart.x, currentEnd.x, currentStart.y,
        otherStart.x, otherEnd.x, otherStart.y)
    }
    else if (!this.isHorizontal && !otherEdge.isHorizontal) {
      return isOverlappingParallelEdges(currentStart.y, currentEnd.y, currentStart.x,
        otherStart.y, otherEnd.y, otherStart.x)
    }
    else if (this.isHorizontal && !otherEdge.isHorizontal) {
      return isOverlappingOrthogonalEdges(currentStart.x, currentEnd.x, currentStart.y,
        otherStart.x, otherStart.y, otherEnd.y)
    }
    else {
      return isOverlappingOrthogonalEdges(currentStart.y, currentEnd.y, currentStart.x,
        otherStart.y, otherStart.x, otherEnd.x)
    }
  }

  // Returns the start or end vertice depending on which one has "smaller" coordinates
  _getSmallerEndpointVertice() {
    return ({
      [directions.EAST]: this.end,
      [directions.NORTH]: this.start,
      [directions.SOUTH]: this.end,
      [directions.WEST]: this.start
    })[this._dir]
  }

  // Returns the start or end vertice depending on which one has "bigger" coordinates
  _getBiggerEndpointVertice() {
    return ({
      [directions.EAST]: this.start,
      [directions.NORTH]: this.end,
      [directions.SOUTH]: this.start,
      [directions.WEST]: this.end
    })[this._dir]
  }

}

module.exports = edge