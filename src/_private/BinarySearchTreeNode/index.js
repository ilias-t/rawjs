/*
 * BinarySearchTreeNode
 * @flow
 */

class BinarySearchTreeNode {
  key: number;
  value: any;
  parent: ?BinarySearchTreeNode;
  left: ?BinarySearchTreeNode;
  right: ?BinarySearchTreeNode;
  constructor(key: number, value: any) {
    this.key = key;
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

export default BinarySearchTreeNode;
