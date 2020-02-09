const test = require('ava')
const linkedList = require('./linkedList')
const linkedListNode = require('./linkedListNode')

test('verify that adding single node to list sets the node as head and tail',
  t => {
    const node = new linkedListNode(null)
    const list = new linkedList(node)
    t.is(list.head, node)
    t.is(list.tail, node)
  }
)

test('verify that adding node to head of existing list works',
  t => {
    const node = new linkedListNode(null)
    const node2 = new linkedListNode(null)
    const list = new linkedList(node)
    list.prependNode(node2)
    t.is(list.head, node2)
    t.is(list.tail, node)
  }
)

test('verify that adding node to tail of existing list works',
  t => {
    const node = new linkedListNode(null)
    const node2 = new linkedListNode(null)
    const list = new linkedList(node)
    list.appendNode(node2)
    t.is(list.head, node)
    t.is(list.tail, node2)
  }
)