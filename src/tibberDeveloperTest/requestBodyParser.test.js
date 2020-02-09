const test = require('ava')
const getRequestBodyParser = require('./requestBodyParser')

test('Verify that path /enter-path returns enterPathReqBodyParser',
  t => {
    const requestBodyParser = getRequestBodyParser('/enter-path', null)
    t.is(typeof requestBodyParser, 'object')
    t.is(requestBodyParser.constructor.name, 'enterPathReqBodyParser')
  }
)

test('Verify that enterPathReqBodyParser parses the body correctly',
  t => {
    const json = JSON.parse('{ "start": { "x": 1, "y": 2 }, "commands": [ { "direction": "north", "steps": 2  }] }')
    const requestBodyParser = getRequestBodyParser('/enter-path', json)
    t.deepEqual(requestBodyParser.initialLocation(), json.start)
    t.deepEqual(requestBodyParser.commands(), json.commands)
  }
)