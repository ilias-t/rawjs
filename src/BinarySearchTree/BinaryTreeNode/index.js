/*
 * BinaryTreeNode
 * @flow
 */

class BinaryTreeNode {
  value: any;
  left: ?BinaryTreeNode;
  right: ?BinaryTreeNode;
  constructor(value: any) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default BinaryTreeNode;
