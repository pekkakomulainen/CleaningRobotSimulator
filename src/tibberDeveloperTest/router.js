var express = require('express')
var router = express.Router()
var controller = require('./controller')

router.post('/enter-path', controller.POST_ENTER_PATH)
module.exports = router
