const getRequestBodyParser = require('./requestBodyParser')
const robotPathService = require('../services/robotPathService')

exports.POST_ENTER_PATH = (req, resp) => {
    const requestBodyParser = getRequestBodyParser('/enter-path', req.body)
    const robotPathSvc = new robotPathService()
    const robotPath = robotPathSvc.buildPath(requestBodyParser.initialLocation(), requestBodyParser.commands())

    resp.contentType('plain/text')
        .status(200)
        .send('All ok here!')
        .end()
}
