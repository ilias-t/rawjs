/*
 * Node
 * @flow
 */

class Node {
  value: any;
  next: ?Node;
  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export default Node;
