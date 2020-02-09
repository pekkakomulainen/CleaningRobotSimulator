const test = require('ava')
const maxEdgeLength = require('./maxEdgeLength')

test('Verify that max edge length has expected value',
  t => {
    t.is(maxEdgeLength, 200001)
  }
)