const bitVector = require('../utility/bitVector')
const maxEdgeLength = require('../constants/maxEdgeLength')

class bruteForceStrategy {
  constructor() {
    this._edgesVisited = 0
    this._verticesVisited = 0
    this._overlappingVertices = new bitVector(maxEdgeLength)
  }

  // Calculates the number of unique locations visited along the path.
  // Returns a number (zero or greater).
  calculate(path) {
    this._edgesVisited = 0
    this._verticesVisited = 0
    var currentNode = path.head;
    while (currentNode) {
      this._edgesVisited++

      this._overlappingVertices.resetVector()
      var otherNode = currentNode.next
      while (otherNode) {
        this._calculateOverlappingVertices(currentNode, otherNode)
        otherNode = otherNode.next
      }
      this._verticesVisited += this._calculateUniqueVerticesVisited(currentNode)
      currentNode = currentNode.next
    }

    return { edgesVisited: this._edgesVisited, verticesVisited: this._verticesVisited}
  }

  _calculateOverlappingVertices(currentNode, otherNode) {
    const currentEdge = currentNode.data
    const otherEdge = otherNode.data
    const overlap = currentEdge.getOverlappingVerticesRange(otherEdge)
    if (overlap == null) {
      return
    }

    for (let bit = overlap.start; bit <= overlap.end; bit++) {
      this._overlappingVertices.setBit(bit)
    }
  }

  _calculateUniqueVerticesVisited(currentNode) {
    const currentLength = currentNode.data.length
    const uniqueVerticesVisited = this._overlappingVertices.countBits(false, currentLength)
    return uniqueVerticesVisited   
  }
}

module.exports = bruteForceStrategy