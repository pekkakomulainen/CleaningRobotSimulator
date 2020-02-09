class serviceCollection {
  constructor() {
    this._serviceRegistrations = {}
  }

  // Registers a service or a service factory. If isFactory is true, service must be
  // a function of type (() => new service). Otherwise, service must be a service instance.
  registerService(name, service, isFactory) {
    this._serviceRegistrations[name] = { service: service, isFactory: isFactory }
  }

  getService(name) {
    const registration = this._serviceRegistrations[name]
    if (registration.isFactory === true) {      
      return registration.service()
    }
    else {
      return registration.service
    }
  }
}

const srvCollection = new serviceCollection()

module.exports = srvCollection