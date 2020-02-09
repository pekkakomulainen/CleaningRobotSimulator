const requestBodyParserProvider = require('./requestBodyParser')
const serviceNames = require('../constants/serviceNames')
const serviceCollection = require('../services/serviceCollection')

exports.POST_ENTER_PATH = async (req, resp) => {
    const time = process.hrtime()
    const requestBodyParser = requestBodyParserProvider('/enter-path', req.body)
    const robotPathSvc = serviceCollection.getService(serviceNames.ROBOT_PATH_SERVICE)
    const robotPath = robotPathSvc.buildPath(requestBodyParser.initialLocation(), requestBodyParser.commands())
    var calculationResult = robotPathSvc.calculateEdgesAndUniqueVerticesVisitedByPath(robotPath)
    const diff = process.hrtime(time)
    // Calculation time in seconds
    const calculationDuration = (diff[0] * 1e9 + diff[1])*1e-9    
    // Generate response
    const responseDataGenSvc = serviceCollection.getService(serviceNames.RESPONSE_DATA_GEN_SERVICE)
    const responseData = await responseDataGenSvc.processCalculationResult(calculationDuration,
        requestBodyParser.commandCount(), calculationResult.verticesVisited)
    console.log(`Processing result: ${JSON.stringify(responseData)}`)

    resp.contentType('application/json')
        .status(200)
        .send(responseData)
        .end()
}
