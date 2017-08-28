/*
 * Singly Linked List
 */

import Node from '../Node'

class SinglyLinkedList {
  constructor() {
    this.head = null
  }

  insert = (data, node = this.head) => {
    if (node == null) {
      this.head = new Node(data)
      return this
    }
    if (node.next == null) {
      node.next = new Node(data)
      return this
    }
    return this.insert(data, node.next)
  }
}

export default SinglyLinkedList
