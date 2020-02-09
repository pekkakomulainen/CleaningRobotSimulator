const requestBodyParserProvider = require('./requestBodyParser')
const serviceNames = require('../constants/serviceNames')
const serviceCollection = require('../services/serviceCollection')

const writeResultToDb = async (dbService, commands, result, duration) => {
    const newEntry = {
        commands: commands,
        result: result,
        duration: duration
    }

    const id = await dbService.insertRowIntoExecutions(newEntry)
    console.log(`writeResultToDb: received id = ${id}`)
    return id
}

const readResultFromDb = async (dbService, id) => {
    const result = await dbService.readExecutionsRow(id)
    console.log(`readResultFromDb: id = ${id}, result = ${JSON.stringify(result)}`)
    return result
}

exports.POST_ENTER_PATH = async (req, resp) => {
    const time = process.hrtime()
    const requestBodyParser = requestBodyParserProvider('/enter-path', req.body)
    const robotPathSvc = serviceCollection.getService(serviceNames.ROBOT_PATH_SERVICE)
    const robotPath = robotPathSvc.buildPath(requestBodyParser.initialLocation(), requestBodyParser.commands())
    var calculationResult = robotPathSvc.calculateEdgesAndUniqueVerticesVisitedByPath(robotPath)
    const diff = process.hrtime(time)
    // Calculation time in seconds
    const calculationDuration = (diff[0] * 1e9 + diff[1])*1e-9

    // TODO: Implement a result processor that 1) generates data for response 2) persists data to db 3) transforms it to json
    // TOOD: Now we do it all here locally
    // Database operations
    const dbService = serviceCollection.getService(serviceNames.DB_SERVICE)
    const id = await writeResultToDb(dbService, requestBodyParser.commandCount(),
        calculationResult.verticesVisited, calculationDuration)
    const result = await readResultFromDb(dbService, id)
    
    // Generate response
    const responseDataGenSvc = serviceCollection.getService(serviceNames.RESPONSE_DATA_GEN_SERVICE)
    const responseData = responseDataGenSvc.generateEnterPathResponse(result)
    console.log(`Processing result: ${JSON.stringify(responseData)}`)

    resp.contentType('application/json')
        .status(200)
        .send(responseData)
        .end()
}
