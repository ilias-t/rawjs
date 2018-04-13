/*
 * LinkedListNode
 * @flow
 */

class LinkedListNode {
  value: any;
  next: ?LinkedListNode;
  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export { LinkedListNode as default };
