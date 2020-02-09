class linkedListNode {
  constructor(data) {
    this._data = data
    this.next = null
  }

  get data() {
    return this._data
  }

  get next() {
    return this._next
  }

  set next(next) {
    this._next = next
  }
}

module.exports = linkedListNode