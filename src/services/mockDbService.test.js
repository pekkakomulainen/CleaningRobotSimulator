const test = require('ava')
const mockDbService = require('./mockDbService')

test('Verify that record written with insertRowIntoExecutions can be read with readExecutionsRow, and the record read contains also id and timestamp properties.',
  async t =>{
    const entry = { name: 'record name'}
    const service = new mockDbService()
    const id = await service.insertRowIntoExecutions(entry)
    const result = await service.readExecutionsRow(id)
    t.is(result.id, id)
    t.is(result.name, entry.name)
    t.truthy(result.timestamp)
  }
)