class responseDataGenerationService {
  constructor() {

  }

  generateEnterPathResponse(data) {
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