const processPath = require('./pathProcessingService')

exports.POST_ENTER_PATH = (req, resp) => {
    const output = processPath(req.body)
    console.log(output)

    resp.contentType('plain/text')
        .status(200)
        .send('All ok here!')
        .end()
}
