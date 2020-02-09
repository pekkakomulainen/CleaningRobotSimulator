const test = require('ava')
const directions = require('../constants/directions')
const bounds = require('../constants/spaceBounds')
const cutValueToBounds = require('./cutValueToBounds')

test('Too big horizontal value should be cut to max X value.',
  t => {
    const x = bounds.MAX_X + 10
    const cutValue = cutValueToBounds(directions.HORIZONTAL, x)
    t.is(cutValue, bounds.MAX_X)
  }
)

test('Too small horizontal value should be cut to max X value.',
  t => {
    const x = bounds.MIN_X - 10
    const cutValue = cutValueToBounds(directions.HORIZONTAL, x)
    t.is(cutValue, bounds.MIN_X)
  }
)

test('Too big vertical value should be cut to max Y value.',
  t => {
    const y = bounds.MAX_Y + 1
    const cutValue = cutValueToBounds(directions.VERTICAL, y)
    t.is(cutValue, bounds.MAX_Y)
  }
)

test('Too small vertical value should be cut to max y value.',
  t => {
    const y = bounds.MIN_Y - 1
    const cutValue = cutValueToBounds(directions.VERTICAL, y)
    t.is(cutValue, bounds.MIN_Y)
  }
)

test('Horizontal value withing bounds should not be cut off.',
  t => {
    const x = 0
    const cutValue = cutValueToBounds(directions.HORIZONTAL, x)
    t.is(cutValue, x)
  }
)

test('Vertical value withing bounds should not be cut off.',
  t => {
    const y = 0
    const cutValue = cutValueToBounds(directions.VERTICAL, y)
    t.is(cutValue, y)
  }
)