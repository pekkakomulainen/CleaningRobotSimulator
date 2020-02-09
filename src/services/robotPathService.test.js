const test = require('ava')
const directions = require('../constants/directions')
const vertex = require('../utility/vertex')
const robotPathService = require('./robotPathService')

test('Test that route with only initial location is built correctly.',
  t => {
    const start = { x: 1, y: 2}
    const commands = []
    const robotPathSvc = new robotPathService()
    const path = robotPathSvc.buildPath(start, commands)
    t.deepEqual(path.head.data.start, new vertex(1, 2))
    t.deepEqual(path.head.data.end, new vertex(1, 2))
  }
)

test('Test that route with a single command is build correctly.',
  t => {
    const start = { x: 1, y: 2}
    const commands = [ { direction: directions.NORTH, steps: 10 }]
    const robotPathSvc = new robotPathService()
    const path = robotPathSvc.buildPath(start, commands)
    t.deepEqual(path.head.data.start, new vertex(1, 2))
    t.deepEqual(path.head.data.end, path.tail.data.start)
    t.deepEqual(path.tail.data.end, new vertex(1, 12))
  }
)

test('Test that route with multiple commands ends up in correct location.',
  t => {
    const start = { x: 0, y: 0}
    const commands = [
      { direction: directions.NORTH, steps: 10 },
      { direction: directions.WEST, steps: 20 },
      { direction: directions.SOUTH, steps: 40 },
      { direction: directions.EAST, steps: 80 },
      { direction: directions.NORTH, steps: 5 },
      { direction: directions.WEST, steps: 5 }
    ]
    const robotPathSvc = new robotPathService()
    const path = robotPathSvc.buildPath(start, commands)
    t.deepEqual(path.tail.data.end, new vertex(-55, -25))
  }
)