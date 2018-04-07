/*
 * Node
 * @flow
 */

class Node {
  data: any;
  next: ?Node;
  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}

export default Node;
