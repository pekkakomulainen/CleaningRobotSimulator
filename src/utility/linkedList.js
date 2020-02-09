const linkedListNode = require('./linkedListNode')

class linkedList {
  constructor(head) {
    this._head = head
    this._tail = head
  }

  get head() {
    return this._head
  }

  get tail() {
    return this._tail
  }

  prependNode(newHead) {
    const oldHead = this._head
    this._head = newHead
    this._head.next = oldHead
  }

  appendNode(newTail) {
    this._tail.next = newTail
    this._tail = newTail
  }
}

module.exports = linkedList