/*
 * TreeNode
 * @flow
 */

class TreeNode {
  value: any;
  left: ?TreeNode;
  right: ?TreeNode;
  constructor(value: any) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default TreeNode;
