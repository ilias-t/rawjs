/*
 * BinarySearchTreeNode
 * @flow
 */

class BinarySearchTreeNode {
  value: any;
  parent: ?BinarySearchTreeNode;
  left: ?BinarySearchTreeNode;
  right: ?BinarySearchTreeNode;
  constructor(value: any) {
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

export { BinarySearchTreeNode as default };
