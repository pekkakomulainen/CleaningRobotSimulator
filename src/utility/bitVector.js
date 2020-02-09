class bitVector {
  constructor(length) {
    const bytesRequired = this._calculateRequiredSpaceInBytes(length)
    this._buffer = new ArrayBuffer(bytesRequired)
    this._view = new Uint8Array(this._buffer)
    for (let i = 0; i < length; i++) {
      this._view[i] = 0
    }
    this._length = length
  }

  _calculateRequiredSpaceInBytes(length) {
    let bytesRequired = (length - length % 8) / 8
    if (length % 8) {
      bytesRequired++
    }

    // console.log(`****** _calculateRequiredSpaceInBytes: length = ${length}, bytesRequired = ${bytesRequired}`)
    return bytesRequired
  }

  get length() {
    return this._length
  }

  // Zero based index
  setBit(idx) {
    // For example:
    const byte = (idx - idx % 8) / 8
    const bitWithinByte = idx % 8
    const mask = 1 << bitWithinByte
    //console.log(`*** setBit: idx = ${idx}, byte = ${byte}, bitWithinByte = ${bitWithinByte}, mask = ${mask}`)
    this._view[byte] = this._view[byte] | mask
  }

  resetBit(idx) {
    const byte = (idx - idx % 8) / 8
    const bitWithinByte = idx % 8
    const mask = ~(1 << bitWithinByte)
    //console.log(`*** resetBit: idx = ${idx}, byte = ${byte}, bitWithinByte = ${bitWithinByte}, mask = ${mask}`)
    this._view[byte] = this._view[byte] & mask
  }

  resetVector() {
    for (let idx = 0; idx < this._buffer.byteLength; idx++) {
      this._view[idx] = 0
    }
  }

  getBitValue(idx) {
    const byte = (idx - idx % 8) / 8
    const bitWithinByte = idx % 8
    const value = (this._view[byte] >> bitWithinByte) & 1
    //console.log(`*** getBitValue: idx = ${idx}, byte = ${byte}, bitWithinByte = ${bitWithinByte}, value = ${value}`)
    return value
  }

  getByteValue(byteIdx) {
    return this._view[byteIdx]
  }

  // Returns the number of bits in the vector that are either set (countSetBits = true) or reset (countSetBits = false).
  // Limits the operation to first bitsToCount bits only, if bitsToCount is defined.
  countBits(countSetBits, bitsToCount) {
    let matchingBits = 0
    const getComparisonValue = (byteValue, bit) => countSetBits ? (byteValue >> bit) : ~(byteValue >> bit)
    for (let idx = 0; idx < this._length; idx++) {
      const bitWithinByte = idx % 8
      if (bitWithinByte % 8 === 0) {
        const byte = (idx - idx % 8) / 8
        var currentByteValue = this.getByteValue(byte)
      }

      if (getComparisonValue(currentByteValue, bitWithinByte) & 1) {
          matchingBits++
      }

      if (bitsToCount != null && --bitsToCount === 0) {
        break
      }
    }

    return matchingBits    
  }


}

module.exports = bitVector