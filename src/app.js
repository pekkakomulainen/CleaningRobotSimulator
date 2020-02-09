const express = require('express')
const tibberDeveloperTestRouter = require('./tibberDeveloperTest/router')
const app = new express()

const logRequest = (req, resp, next) => {
    console.log(`receive ${req.method} request from ${req.ip} to ${req.hostname}${req.originalUrl}`)
    next()
}

app.use(express.json())
app.use(logRequest)
app.use('/tibber-developer-test', tibberDeveloperTestRouter)

module.exports = app
