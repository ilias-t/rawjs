/*
 * LinkedList
 * @flow
 */

import { isNumber } from 'lodash';
import { Node } from '../';

class LinkedList {
  head: ?Node;
  length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  /**
   * Inserts the value into a node at the end of the list, recursively.
   */
  insert = (value: any, node: ?Node = this.head): LinkedList => {
    if (node == null) {
      this.head = new Node(value);
      this.length += 1;
      return this;
    }

    if (node.next == null) {
      node.next = new Node(value);
      this.length += 1;
      return this;
    }

    return this.insert(value, node.next);
  };

  /**
   * Inserts the value into a node with a specific position in the list.
   */
  insertAt = (value: any, position: number): LinkedList => {
    this._checkIsInBounds(position);
    // new Node, to be inserted
    const node = new Node(value);

    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      const prev = this.findAt(position - 1);
      const { next } = prev;
      node.next = next;
      prev.next = node;
    }
    this.length += 1;
    return this;
  };

  /**
   * Inserts the value into a node at the beginning of the list, as the head.
   */
  insertFirst = (value: any): LinkedList => {
    return this.insertAt(value, 0);
  };

  /**
   * Returns the first node with a value matching that provided.
   */
  get = (value: any): ?Node => {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current && current.value === value) {
        return current;
      }
      current = current && current.next;
    }
    return null;
  };

  /**
   * Finds the node located at the provided position.
   */
  findAt = (position: number): any => {
    this._checkIsInBounds(position);

    let current = this.head;
    for (let i = 0; i < position; i++) {
      current = current && current.next;
    }
    return current;
  };

  /**
   * Search the list for the first node containing the value provided using a strict
   * equality comparison and return the index.
   */
  positionOf = (value: any): number => {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current && current.value === value) {
        return i;
      }
      current = current && current.next;
    }
    return -1;
  };

  /**
   * Deletes the the first node with the value provided, returning the value deleted.
   */
  deleteAt = (position: number): any => {
    if (this.head == null) {
      // Cannot delete from an empty list
      return null;
    }

    if (position === 0) {
      const target = this.head;
      this.head = target.next;
      this.length -= 1;
      return target.value;
    }

    this._checkIsInBounds(position);
    const prev = this.findAt(position - 1);
    // Find item to delete and set the previous node's next to the deleted node's next
    const target = prev.next;
    prev.next = target.next;
    this.length -= 1;
    return target.value;
  };

  /**
   * Deletes the the first node with the value provided, returning the value deleted.
   */
  delete = (value: any): any => {
    try {
      const position = this.positionOf(value);
      return this.deleteAt(position);
    } catch (e) {
      return null;
    }
  };

  toArray = (): any[] => {
    const array = [];
    if (this.head == null) {
      return array;
    }
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  };

  _checkIsInBounds = (num: number): boolean => {
    if (!isNumber(num)) {
      throw new Error('Provided position is invalid');
    }
    if (num >= this.length || num < 0) {
      throw new Error('Provided position is out of bounds');
    }
    return true;
  };
}

export default LinkedList;
