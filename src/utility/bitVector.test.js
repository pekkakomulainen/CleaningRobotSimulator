const test = require('ava')
const bitVector = require('./bitVector')

test('Verify that bitVector\'s data is initialized to array of correct length and contains false values',
  t => {
    const length = 16
    const vector = new bitVector(length)
    const byte0 = vector.getByteValue(0)
    const byte1 = vector.getByteValue(1)
    const byte2 = vector.getByteValue(2)
    t.is(byte0, 0)
    t.is(byte1, 0)
    t.is(byte2, undefined)
  }
)

test('Verify that setting some bits works correctly',
  t => {
    const length = 16
    const vector = new bitVector(length)
    vector.setBit(0)
    vector.setBit(2)
    vector.setBit(8)
    vector.setBit(9)
    vector.setBit(10)

    const byte0bits = [1, 0, 1, 0, 0, 0, 0, 0]
    byte0bits.forEach((val, idx) => {
      const bit = vector.getBitValue(idx)
      t.is(bit, val)
    })

    const byte1bits = [1, 1, 1, 0, 0, 0, 0, 0]
    byte1bits.forEach((val, idx) => {
      const bit = vector.getBitValue(idx + 8)
      t.is(bit, val)
    })

    const byte0 = vector.getByteValue(0)
    const byte1 = vector.getByteValue(1)
    t.is(byte0, 5)
    t.is(byte1, 7)
  })

test('Verify that resetting some bits works correctly',
  t => {
    const length = 16
    const vector = new bitVector(length)
    for (let i = 0; i < length; i++) {
      vector.setBit(i)
    }

    var byte0 = vector.getByteValue(0)
    var byte1 = vector.getByteValue(1)
    t.is(byte0, 255)
    t.is(byte1, 255)

    vector.resetBit(0)
    vector.resetBit(3)
    vector.resetBit(5)
    vector.resetBit(9)
    vector.resetBit(15)

    const byte0bits = [0, 1, 1, 0, 1, 0, 1, 1]
    byte0bits.forEach((val, idx) => {
      const bit = vector.getBitValue(idx)
      t.is(bit, val)
    })

    const byte1bits = [1, 0, 1, 1, 1, 1, 1, 0]
    byte1bits.forEach((val, idx) => {
      const bit = vector.getBitValue(idx + 8)
      t.is(bit, val)
    })

    byte0 = vector.getByteValue(0)
    byte1 = vector.getByteValue(1)
    t.is(byte0, 214)
    t.is(byte1, 125)
})

test('Verify that bitVector.length returns the correct value',
  t => {
    const length = 20
    const vector = new bitVector(length)
    t.is(vector.length, length)
  }
)

test('Verify that bit vector works for big length values, too',
  t => {
    const length = 200001
    const vector = new bitVector(length)
    vector.setBit(0)
    vector.setBit(length - 1)

    const firstBitValue = vector.getBitValue(0)
    const lastBitValue = vector.getBitValue(0)
    t.is(firstBitValue, 1)
    t.is(lastBitValue, 1)
  })

test('Verify that setting or resetting a bit twice yields correct results',
  t => {
    const length = 17
    const vector = new bitVector(length)
    var bitValue = vector.getBitValue(16)
    t.is(bitValue, 0)
    vector.setBit(16)
    vector.setBit(16)
    bitValue = vector.getBitValue(16)
    t.is(bitValue, 1)
    vector.resetBit(16)
    vector.resetBit(16)
    bitValue = vector.getBitValue(16)
    t.is(bitValue, 0)
})

test('Verify that bitVector.countBits yields corect results',
  t => {
    let length = 18
    let vector = new bitVector(length)
    let bitsSet = vector.countBits(true)
    let bitsReset = vector.countBits(false) 
    t.is(bitsSet, 0)
    t.is(bitsReset, 18)
    bitsReset = vector.countBits(false, 8)
    t.is(bitsReset, 8)

    vector.setBit(0)
    vector.setBit(3)
    vector.setBit(8)
    vector.setBit(17)
    bitsSet = vector.countBits(true)
    bitsReset = vector.countBits(false)
    t.is(bitsSet, 4)
    t.is(bitsReset, 14)
    bitsSet = vector.countBits(true, 10)
    bitsReset = vector.countBits(false, 10)
    t.is(bitsSet, 3)
    t.is(bitsReset, 7)

    length = 200001
    vector = new bitVector(length)
    vector.setBit(0)
    vector.setBit(4)
    vector.setBit(7)
    vector.setBit(8)
    vector.setBit(length - 10)
    vector.setBit(length - 5)
    vector.setBit(length - 1)
    bitsSet = vector.countBits(true)
    bitsReset = vector.countBits(false)
    t.is(bitsSet, 7)
    t.is(bitsReset, 200001 - 7)

    bitsSet = vector.countBits(true, 10240)
    bitsReset = vector.countBits(false, 10240)
    t.is(bitsSet, 4)
    t.is(bitsReset, 10236)
  }
)

test('Verify that resetting the vector works correctly',
  t => {
    const length = 18
    const vector = new bitVector(length)
    vector.setBit(0)
    vector.setBit(2)
    vector.setBit(8)
    vector.setBit(16)
    vector.setBit(17)
    vector.resetVector()

    const byte0 = vector.getByteValue(0)
    const byte1 = vector.getByteValue(1)
    const byte2 = vector.getByteValue(2)

    t.is(byte0, 0)
    t.is(byte1, 0)
    t.is(byte2, 0)
  }
)
