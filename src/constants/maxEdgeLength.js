const spaceBounds = require('./spaceBounds')

const maxVerticalEdgeLength = spaceBounds.MAX_Y - spaceBounds.MIN_Y + 1
const maxHorizontalEdgeLength = spaceBounds.MAX_X - spaceBounds.MIN_X + 1
const maxEdgeLength = maxVerticalEdgeLength > maxHorizontalEdgeLength ?
  maxVerticalEdgeLength : maxHorizontalEdgeLength

module.exports = maxEdgeLength