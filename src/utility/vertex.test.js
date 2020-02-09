const test = require('ava')
const directions = require('../constants/directions')
const bounds = require('../constants/spaceBounds')
const vertex = require('./vertex')

const v = new vertex(-1, 2)

test('verify that vertex properties return correct values',
  t => {
    t.is(-1, v.x)
    t.is(2, v.y)
  }
)

test('Verify that vertex created with out of bounds coordinates is cut to within bounds',
  t => {
    const v2 = new vertex(bounds.MAX_X + 1, bounds.MIN_Y - 10)
    t.is(bounds.MAX_X, v2.x)
    t.is(bounds.MIN_Y, v2.y)
  }
)

test('verify that vertex can be moved north correctly',
  t => {
    const v2 = v.newFromExisting(directions.NORTH, 3)
    t.is(-1, v2.x)
    t.is(5, v2.y)
  }
)

test('verify that vertex can be moved south correctly',
  t => {
    const v2 = v.newFromExisting(directions.SOUTH, 5)
    t.is(-1, v2.x)
    t.is(-3, v2.y)
  }
)

test('verify that vertex can be moved east correctly',
  t => {
    const v2 = v.newFromExisting(directions.EAST, 5)
    t.is(-6, v2.x)
    t.is(2, v2.y)
  }
)

test('verify that vertex can be moved west correctly',
  t => {
    const v2 = v.newFromExisting(directions.WEST, 5)
    t.is(4, v2.x)
    t.is(2, v2.y)
  }
)

test('Verify that isEqual invoked with similar vertex returns true',
  t => {
    const v2 = v.newFromExisting(directions.NORTH, 0)
    const isEqual = v.isEqual(v2)
    t.is(isEqual, true)
  }
)

test('Verify that isEqual invoked with different vertex returns false',
  t => {
    const v2 = v.newFromExisting(directions.NORTH, 1)
    const isEqual = v.isEqual(v2)
    t.is(isEqual, false)
  }
)
