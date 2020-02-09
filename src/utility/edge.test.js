const test = require('ava')
const directions = require('../constants/directions')
const bounds = require('../constants/spaceBounds')
const edge = require('./edge')
const vertex = require('./vertex')

test('Verify that edge end vertex is calculated correctly.',
  t => {
    const start = new vertex(0, 0)
    const e = new edge(start, directions.NORTH, 10)
    t.is(e.direction, directions.NORTH)
    t.is(e.isHorizontal, false)
    t.deepEqual(e.end, new vertex(0, 10))
  }
)

test('Verify that edge end vertex is kept within bounds.',
  t => {
    const start = new vertex(10, 10)
    const e = new edge(start, directions.WEST, bounds.MAX_X)
    t.is(e.direction, directions.WEST)
    t.is(e.isHorizontal, true)
    t.deepEqual(e.end, new vertex(bounds.MAX_X, 10))
  }
)

test('Verify that getVerticesAlongEdge works correctly for NORTH-bound edge.',
  t => {
    const start = new vertex(1, 2)
    const e = new edge(start, directions.NORTH, 3)
    const verticesAlongEdge = e.getVerticesAlongEdge()
    t.is(verticesAlongEdge.length, 3)
    t.is(verticesAlongEdge[0].isEqual(new vertex(1, 3)), true)
    t.is(verticesAlongEdge[1].isEqual(new vertex(1, 4)), true)
    t.is(verticesAlongEdge[2].isEqual(new vertex(1, 5)), true)
  }
)

test('Verify that getVerticesAlongEdge works correctly for EAST-bound edge.',
  t => {
    const start = new vertex(1, 2)
    const e = new edge(start, directions.EAST, 4)
    const verticesAlongEdge = e.getVerticesAlongEdge()
    t.is(verticesAlongEdge.length, 4)
    t.is(verticesAlongEdge[0].isEqual(new vertex(0, 2)), true)
    t.is(verticesAlongEdge[1].isEqual(new vertex(-1, 2)), true)
    t.is(verticesAlongEdge[2].isEqual(new vertex(-2, 2)), true)
    t.is(verticesAlongEdge[3].isEqual(new vertex(-3, 2)), true)
  }
)

test('Verify that getVerticesAlongEdge returns an empty array for an edge of length 0.',
  t => {
    const start = new vertex(1, 2)
    const e = new edge(start, directions.NORTH, 0)
    const verticesAlongEdge = e.getVerticesAlongEdge()
    t.is(verticesAlongEdge.length, 0)
  }
)

test('Verify that getOverlappingVerticesRange returns correct value.',
  t => {
    const vertexA = new vertex(0, 0)
    const vertexB = new vertex(-2, 2)
    const vertexC = new vertex(4, 2)
    const vertexD = new vertex(3, 3)
    
    const edge1 = new edge(vertexA, directions.NORTH, 10)
    const edge2 = new edge(vertexB, directions.WEST, 8)
    const edge3 = new edge(vertexC, directions.EAST, 3)
    const edge4 = new edge(vertexD, directions.SOUTH, 3)

    t.deepEqual(edge1.getOverlappingVerticesRange(edge1), { start: 0, end: 10})
    t.deepEqual(edge1.getOverlappingVerticesRange(edge2), { start: 2, end: 2})
    t.is(edge1.getOverlappingVerticesRange(edge3), null)
    t.is(edge1.getOverlappingVerticesRange(edge4), null)

    t.deepEqual(edge2.getOverlappingVerticesRange(edge1), { start: 2, end: 2})
    t.deepEqual(edge2.getOverlappingVerticesRange(edge3), { start: 3, end: 6})
    t.deepEqual(edge2.getOverlappingVerticesRange(edge4), { start: 5, end: 5})

    t.is(edge3.getOverlappingVerticesRange(edge1), null)
    t.deepEqual(edge3.getOverlappingVerticesRange(edge2), { start: 0, end: 3})
    t.deepEqual(edge3.getOverlappingVerticesRange(edge4), { start: 2, end: 2})

    t.is(edge4.getOverlappingVerticesRange(edge1), null)
    t.deepEqual(edge4.getOverlappingVerticesRange(edge2), { start: 2, end: 2})
    t.deepEqual(edge4.getOverlappingVerticesRange(edge3), { start: 2, end: 2})
})

test('Verify that _getSmallerEndpointVertice returns the correct vertice',
  t => {
    const start = new vertex(0, 0)
    const endEast = new vertex(-2, 0)
    const endSouth = new vertex(0, -2)
    
    const edgeA = new edge(start, directions.EAST, 2)
    t.deepEqual(edgeA._getSmallerEndpointVertice(), endEast)

    const edgeB = new edge(start, directions.NORTH, 2)
    t.deepEqual(edgeB._getSmallerEndpointVertice(), start)

    const edgeC = new edge(start, directions.SOUTH, 2)
    t.deepEqual(edgeC._getSmallerEndpointVertice(), endSouth)

    const edgeD = new edge(start, directions.WEST, 2)
    t.deepEqual(edgeD._getSmallerEndpointVertice(), start)

    const edgeE = new edge(start, directions.EAST, 0)
    t.deepEqual(edgeE._getSmallerEndpointVertice(), start)
  }
)

test('Verify that _getBiggerEndpointVertice returns the correct vertice',
  t => {
    const start = new vertex(0, 0)
    const endNorth = new vertex(0, 2)
    const endWest = new vertex(2, 0)
    
    const edgeA = new edge(start, directions.EAST, 2)
    t.deepEqual(edgeA._getBiggerEndpointVertice(), start)

    const edgeB = new edge(start, directions.NORTH, 2)
    t.deepEqual(edgeB._getBiggerEndpointVertice(), endNorth)

    const edgeC = new edge(start, directions.SOUTH, 2)
    t.deepEqual(edgeC._getBiggerEndpointVertice(), start)

    const edgeD = new edge(start, directions.WEST, 2)
    t.deepEqual(edgeD._getBiggerEndpointVertice(), endWest)

    const edgeE = new edge(start, directions.EAST, 0)
    t.deepEqual(edgeE._getBiggerEndpointVertice(), start)
  }
)

test('Verfy that length property yields correct results',
  t => {
    const start = new vertex(1, 2)
    const edgeA = new edge(start, directions.EAST, 3)
    const edgeB = new edge(start, directions.NORTH, 4)
    const edgeC = new edge(start, directions.SOUTH, 5)
    const edgeD = new edge(start, directions.WEST, 6)
    const edgeE = new edge(start, directions.EAST, 0)

    t.is(edgeA.length, 4)
    t.is(edgeB.length, 5)
    t.is(edgeC.length, 6)
    t.is(edgeD.length, 7)
    t.is(edgeE.length, 1)
  }
)