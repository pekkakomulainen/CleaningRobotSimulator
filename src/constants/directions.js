const isHorizontal = dir => ({
  [this.EAST]: true,
  [this.HORIZONTAL]: true,
  [this.NORTH]: false,
  [this.SOUTH]: false,
  [this.VERTICAL]: false,
  [this.WEST]: true
})[dir]

const dirctionHorizontalOrVertical = dir => isHorizontal(dir) ? this.HORIZONTAL : this.VERTICAL

exports.EAST = 'east'
exports.NORTH = 'north'
exports.SOUTH = 'south'
exports.WEST = 'west'
exports.HORIZONTAL = 'horizontal'
exports.VERTICAL = 'vertical'
exports.isHorizontal = isHorizontal
exports.toHorizontalOrVertical = dirctionHorizontalOrVertical
