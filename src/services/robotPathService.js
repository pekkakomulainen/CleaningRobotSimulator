const directions = require('../constants/directions')
const edge = require('../utility/edge')
const vertex = require('../utility/vertex')
const linkedList = require('../utility/linkedList')
const linkedListNode = require('../utility/linkedListNode')
const serviceNames = require('../constants/serviceNames')
const serviceCollection = require('./serviceCollection')

class robotPathService {
  constructor() {}

  buildPath(initialLocation, commands) {
    const rootEdge = new edge(new vertex(initialLocation.x, initialLocation.y), directions.NORTH, 0)
    const rootNode = new linkedListNode(rootEdge)
    const path = new linkedList(rootNode)
    var currentEdge = rootEdge

    commands.forEach(cmd => {
      const dir = cmd.direction
      const steps = cmd.steps
      currentEdge = new edge(currentEdge.end, dir, steps)
      path.appendNode(new linkedListNode(currentEdge))
    });

    return path
  }

  calculateEdgesAndUniqueVerticesVisitedByPath(path) {
    const strategy = serviceCollection.getService(serviceNames.CALCULATION_STRATEGY)
    return strategy.calculate(path)
  }
}

module.exports = robotPathService