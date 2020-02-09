const directions = require('../constants/directions')

const processPath = (input) => {
    const initialPos = input.start
    output = input.commands.reduce(calculateNewPosition, initialPos)
    return output
}

const calculateNewPosition = (initialPos, command) => {
    const direction = command.direction
    const steps = command.steps

    console.log(`initialPos = x:${initialPos.x}, y:${initialPos.y}`)
    const operator = directionToOperator(direction)
    const delta = directionAndStepsToDelta(direction, steps)
    const result = addPosition(initialPos, delta, operator)
    console.log(`newPos = x:${result.x}, y:${result.y}`)
    return result
}

const directionToOperator = (direction) => {
    const operatorNameToOperator = (op) => {
        return ({
            '+': (l, r) => { return l + r },
            '-': (l, r) => { return l - r} 
        })[op]
    }

    return ({
        'east': operatorNameToOperator('-'),
        'north': operatorNameToOperator('+'),
        'south': operatorNameToOperator('-'),
        'west': operatorNameToOperator('+')
    })[direction]
}

const directionAndStepsToDelta = (direction, steps) => {
    return ({
        'east': {x: steps, y: 0},
        'north': {x: 0, y: steps},
        'south': {x: 0, y:steps},
        'west': {x: steps, y: 0}
    })[direction]
}

const addPosition = (left, right, operator) => {
    return {
        x: operator(left.x, right.x),
        y: operator(left.y, right.y)
    }
}

module.exports = processPath
