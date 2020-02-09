const test = require('ava')
const responseDataGenerationService = require('./responseDataGenerationService')

test('Verify that response data is generated correctly for enter-path reqest.',
  t => {
    const data = {
      id: 0,
      timestamp: new Date('2020-01-31T01:23:45+02:00'),
      commands: 3,
      result: 14,
      duration: 12345
    }

    const expectedResponse = {
      id: 0,
      timestamp: '2020-01-30T23:23:45.000Z',
      commands: 3,
      result: 14,
      duration: 12345
    }

    const responseGenerationService = new responseDataGenerationService()
    const responseData = responseGenerationService._generateEnterPathResponse(data)
    t.deepEqual(responseData, expectedResponse)
  }
)