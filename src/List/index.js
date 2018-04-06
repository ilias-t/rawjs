/*
 * Singly Linked List
 * @flow
 */

import Node from '../Node'

class List {
  head: ?Node;

  constructor() {
    this.head = null
  }

  insert = (data: any, node: ?Node = this.head) => {
    if (node == null) {
      this.head = new Node(data)
      // Allows for chaining
      return this
    }
    if (node.next == null) {
      node.next = new Node(data)
      return this
    }
    // Recursively insert
    return this.insert(data, node.next)
  }
}

export default List
