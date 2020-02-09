const express = require('express')
const tibberDeveloperTestRouter = require('./tibberDeveloperTest/router')
const serviceCollection = require('./services/serviceCollection')
const serviceNames = require('./constants/serviceNames')
const dbService = require('./services/dbService')
const mockDbService = require('./services/mockDbService')
const strategyNames = require('./constants/calculationStrategies')
const strategyProvider = require('./calculationStrategies/strategyProvider')
const responseDataService = require('./services/responseDataGenerationService')
const robotPathService = require('./services/robotPathService')
const app = new express()

// Log env parameters
const envParameters = {
    port: (process.env.port != null) ? process.env.port : null,
    use_database: (process.env.use_database != null) ? process.env.use_database : null,
    PGHOST: (process.env.PGHOST != null) ? process.env.PGHOST : null,
    PGUSER: (process.env.PGUSER != null) ? process.env.PGUSER : null,
    PGDATABASE: (process.env.PGDATABASE != null) ? process.env.PGDATABASE : null,
    PGPORT: (process.env.PGPORT != null) ? process.env.PGPORT : null,
}
console.log(`Environment parameters: ${JSON.stringify(envParameters)}`)

// Register services to service collection
const useDatabase = process.env.use_database
if (useDatabase == true) {
    console.log(`Using real db service`)
    serviceCollection.registerService(serviceNames.DB_SERVICE, new dbService())
}
else {
    console.log(`Using mock db service`)
    serviceCollection.registerService(serviceNames.DB_SERVICE, new mockDbService())
}

// Always instantiate a new strategy object when CALCULATION_STRATEGY is requested
serviceCollection.registerService(serviceNames.CALCULATION_STRATEGY, (() => strategyProvider(strategyNames.BRUTE_FORCE))())
serviceCollection.registerService(serviceNames.ROBOT_PATH_SERVICE, new robotPathService())
serviceCollection.registerService(serviceNames.RESPONSE_DATA_GEN_SERVICE, new responseDataService())

const logRequest = (req, resp, next) => {
    console.log(`receive ${req.method} request from ${req.ip} to ${req.hostname}${req.originalUrl}`)
    next()
}

// Configure the app
app.use(express.json({ limit: '50mb'}))
app.use(logRequest)
app.use('/tibber-developer-test', tibberDeveloperTestRouter)

module.exports = app
