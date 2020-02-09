class serviceCollection {
  constructor() {
    this._services = {}
  }

  registerService(name, service) {
    this._services[name] = service
  }

  getService(name) {
    const service = this._services[name]
    console.log(`serviceCollection.getService: name = ${name}, returned service = ${typeof service} - ${service.constructor.name}`)
    return service
  }
}

const srvCollection = new serviceCollection()

module.exports = srvCollection