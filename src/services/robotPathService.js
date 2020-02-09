const directions = require('../constants/directions')
const edge = require('../utility/edge')
const vertex = require('../utility/vertex')
const linkedList = require('../utility/linkedList')
const linkedListNode = require('../utility/linkedListNode')

class robotPathService {
  constructor() {
  }

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
}

module.exports = robotPathService