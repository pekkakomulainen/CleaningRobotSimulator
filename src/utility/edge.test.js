const test = require('ava')
const directions = require('../constants/directions')
const bounds = require('../constants/spaceBounds')
const edge = require('./edge')
const vertex = require('./vertex')

test('Verify that edge end vertex is calculated correctly.',
  t => {
    const start = new vertex(0, 0)
    const e = new edge(start, directions.NORTH, 10)
    t.is(e.direction, directions.VERTICAL)
    t.deepEqual(e.end, new vertex(0, 10))
  }
)

test('Verify that edge end vertex is kept within bounds.',
  t => {
    const start = new vertex(10, 10)
    const e = new edge(start, directions.WEST, bounds.MAX_X)
    t.is(e.direction, directions.HORIZONTAL)
    t.deepEqual(e.end, new vertex(bounds.MAX_X, 10))
  }
)