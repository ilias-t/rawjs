/*
 * BinarySearchTreeNode
 * @flow
 */

class BinarySearchTreeNode {
  value: any;
  left: ?BinarySearchTreeNode;
  right: ?BinarySearchTreeNode;
  constructor(value: any) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default BinarySearchTreeNode;
