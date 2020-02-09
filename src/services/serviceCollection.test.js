const test = require('ava')
const serviceCollection = require('./serviceCollection')

class someService {
  constructor() {}
}

test('Verify that serviceCollection returns a service registered to it.',
  t => {
    serviceCollection.registerService('SOME_SERVICE', new someService())
    const someService1 = serviceCollection.getService('SOME_SERVICE')
    const someService2 = serviceCollection.getService('SOME_SERVICE')
    t.is(typeof someService1, 'object')
    t.is(someService1.constructor.name, 'someService')
    t.is(someService1, someService2)
  }
)

test('Verify that serviceCollection invokes the service factory registered to it.',
  t => {
    serviceCollection.registerService('SOME_SERVICE', (() => new someService()), true)
    const someService1 = serviceCollection.getService('SOME_SERVICE')
    const someService2 = serviceCollection.getService('SOME_SERVICE')
    t.is(typeof someService1, 'object')
    t.is(someService1.constructor.name, 'someService')
    t.is(typeof someService2, 'object')
    t.is(someService2.constructor.name, 'someService')
    t.not(someService1, someService2)
  }
)