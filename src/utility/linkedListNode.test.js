const test = require('ava')
const linkedListNode = require('./linkedListNode')

test('verify that new linked list node has no next node',
  t => {
    const data = 'some data'
    const node = new linkedListNode(data)
    t.is(node.data, data)
    t.is(node.next, null)
  }
)

test('verify that setting linked list node\'s next node works',
  t => {
    const data = 'some data'
    const data2 = 'some other data'
    const node = new linkedListNode(data)
    const node2 = new linkedListNode(data2)
    node.next = node2
    t.is(node.next, node2)
    t.is(node.next.data, data2)
  })