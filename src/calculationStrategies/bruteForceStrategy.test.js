const test = require('ava')
const bruteForceStrategy = require('./bruteForceStrategy')
const linkedList = require('../utility/linkedList')
const linkedListNode = require('../utility/linkedListNode')
const edge = require('../utility/edge')
const vertex = require('../utility/vertex')
const directions = require('../constants/directions')

test('Test that invoking calculate returns the correct number of edges along the path',
  t => {
    var path = null
    const nodeValues = [1, 2, 3]
    nodeValues.forEach((val, idx) => {
      if (idx === 0) {
        path = new linkedList(new linkedListNode(val))
      }
      else {
        path.appendNode(new linkedListNode(val))
      }
    });

    const strategy = new bruteForceStrategy()
    strategy._calculateOverlappingVertices = (currentNode, otherNode) => null
    strategy._calculateUniqueVerticesVisited = (currentNode) => 0

    const result = strategy.calculate(path)
    t.is(result.edgesVisited, 3)
  }
)

test('Verify the calculation for a simple path with only a single edge of zero steps',
  t => {
    const start = new vertex(0, 0)
    const edgeA = new edge(start, directions.EAST, 0)
    const rootNode = new linkedListNode(edgeA)
    const path = new linkedList(rootNode)
    const strategy = new bruteForceStrategy()
    const result = strategy.calculate(path)
    t.is(result.edgesVisited, 1)
    t.is(result.verticesVisited, 1)
  }
)

test('Verify the calculation for a simple path with only a single edge with non-zero steps',
  t => {
    const start = new vertex(0, 0)
    const edgeA = new edge(start, directions.SOUTH, 100000)
    const rootNode = new linkedListNode(edgeA)
    const path = new linkedList(rootNode)
    const strategy = new bruteForceStrategy()
    const result = strategy.calculate(path)
    t.is(result.edgesVisited, 1)
    t.is(result.verticesVisited, 100001)
  }
)

test('Verify the calculation for a path with multiple non-overlapping edges.',
  t => {
    const start = new vertex(0, 0)
    const edgeA = new edge(start, directions.EAST, 1)
    const edgeB = new edge(edgeA.end, directions.NORTH, 2)
    const edgeC = new edge(edgeB.end, directions.WEST, 3)
    const rootNode = new linkedListNode(edgeA)
    const path = new linkedList(rootNode)
    path.appendNode(new linkedListNode(edgeB))
    path.appendNode(new linkedListNode(edgeC))
    const strategy = new bruteForceStrategy()
    const result = strategy.calculate(path)
    t.is(result.edgesVisited, 3)
    t.is(result.verticesVisited, 7)
  }
)

test('Verify the calculation for a path with overlapping edges.',
  t => {
    const start = new vertex(0, 0)
    const edgeA = new edge(start, directions.EAST, 3)
    const edgeB = new edge(edgeA.end, directions.NORTH, 2)
    const edgeC = new edge(edgeB.end, directions.WEST, 1)
    const edgeD = new edge(edgeC.end, directions.SOUTH, 2)
    const edgeE = new edge(edgeD.end, directions.WEST, 3)
    const rootNode = new linkedListNode(edgeA)
    const path = new linkedList(rootNode)
    path.appendNode(new linkedListNode(edgeB))
    path.appendNode(new linkedListNode(edgeC))
    path.appendNode(new linkedListNode(edgeD))
    path.appendNode(new linkedListNode(edgeE))
    const strategy = new bruteForceStrategy()
    const result = strategy.calculate(path)
    t.is(result.edgesVisited, 5)
    t.is(result.verticesVisited, 9)
  }
)