const serviceCollection = require('./serviceCollection')
const serviceNames = require('../constants/serviceNames')

class responseDataGenerationService {
  constructor() {

  }

  async processCalculationResult(duration, commands, verticesVisited) {
    const newEntry = {
      commands: commands,
      result: verticesVisited,
      duration: duration
    }

    const dbService = serviceCollection.getService(serviceNames.DB_SERVICE)
    const id = await dbService.insertRowIntoExecutions(newEntry)
    const resultRecord = await dbService.readExecutionsRow(id)
    const responseData = this._generateEnterPathResponse(resultRecord)
    return responseData
  }

  _generateEnterPathResponse(data) {
    const responseData = {
      id: data.id,
      timestamp: data.timestamp.toISOString(),
      commands: data.commands,
      result: data.result,
      duration: data.duration
    }

    return responseData
  }
}

module.exports = responseDataGenerationService