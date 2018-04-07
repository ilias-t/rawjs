/*
 * LinkedList
 * @flow
 */

import _ from 'lodash';
import Node from '../Node';

class LinkedList {
  head: ?Node;
  length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  /**
   * Inserts an item into the list
   */
  insert = (data: any, node: ?Node = this.head) => {
    if (node == null) {
      this.head = new Node(data);
      this.length += 1;
      return this;
    }

    if (node.next == null) {
      node.next = new Node(data);
      this.length += 1;
      return this;
    }
    // Recursively insert
    return this.insert(data, node.next);
  };

  /**
   * Searches for the item located at the provided index
   */
  searchAt = (place: number): any => {
    if (!_.isNumber(place)) {
      throw new Error('Provided index is invalid type');
    }
    if (place < 0 || place > this.length) {
      throw new Error('Provided index is out of bounds');
    }

    let current = this.head;
    for (let i = 0; i < place; i++) {
      // Walk the list
      current = current && current.next;
    }
    return current && current.data;
  };
}

export default LinkedList;
