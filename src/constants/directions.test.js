const test = require('ava')
const directions = require('./directions')

test('NORTH, SOUTH and VERTICAL should be intepreted as non-horizontal directions',
  t => {
    const dir = [directions.SOUTH, directions.NORTH, directions.VERTICAL]
    const isHorizontal = dir.map(e => directions.isHorizontal(e))
    t.deepEqual(isHorizontal, [false, false, false])
  }
)

test('NORTH, SOUTH and VERTICAL should convert to VERTICAL',
  t => {
    const dir = [directions.SOUTH, directions.NORTH, directions.VERTICAL]
    const horizontalOrVertical = dir.map(e => directions.toHorizontalOrVertical(e))
    t.deepEqual(horizontalOrVertical, [directions.VERTICAL, directions.VERTICAL, directions.VERTICAL])
  }
)

test('EAST, WEST and HORIZONTAL should be intepreted as horizontal directions',
  t => {
    const dir = [directions.EAST, directions.HORIZONTAL, directions.WEST]
    const isHorizontal = dir.map(e => directions.isHorizontal(e))
    t.deepEqual(isHorizontal, [true, true, true])
  }
)

test('EAST, WEST and HORIZONTAL should convert to HORIZONTAL',
  t => {
    const dir = [directions.EAST, directions.HORIZONTAL, directions.WEST]
    const horizontalOrVertical = dir.map(e => directions.toHorizontalOrVertical(e))
    t.deepEqual(horizontalOrVertical, [directions.HORIZONTAL, directions.HORIZONTAL, directions.HORIZONTAL])
  }
)
