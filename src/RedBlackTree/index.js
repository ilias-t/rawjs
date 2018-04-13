/*
 * RedBlackTree
 * @flow
 */

import BinarySearchTree from '../BinarySearchTree';

import RedBlackTreeNode, { ColorEnums } from '../_private/RedBlackTreeNode';

type TLeft = 0;
type TRight = 1;

export const DirectionEnums: { LEFT: TLeft, RIGHT: TRight } = {
  LEFT: 0,
  RIGHT: 1,
};

export const DirectionConstants: { LEFT: string, RIGHT: string } = {
  LEFT: 'left',
  RIGHT: 'right',
};

class RedBlackTree extends BinarySearchTree {
  root: ?TTreeNode;

  static checkKeyIsValid(key: any) {
    super.checkKeyIsValid(key);
  }
  static isNilNode(node: ?TTreeNode): boolean {
    return (
      node == null ||
      (node.key == null &&
        node.color === ColorEnums.BLACK &&
        node.left == null &&
        node.right == null)
    );
  }

  leftRotate(node: TTreeNode): void {
    return this._rotate(node, DirectionEnums.LEFT);
  }

  rightRotate(node: TTreeNode): void {
    return this._rotate(node, DirectionEnums.RIGHT);
  }

  insert(key: number, value: any = null): RedBlackTree {
    // Throws if provided a non-numerical key
    RedBlackTree.checkKeyIsValid(key);

    // Create node to insert
    const newNode: TTreeNode = new RedBlackTreeNode(key, value);
    if (this.root == null) {
      // Tree is empty
      this.root = newNode;
      return this;
    }
    let prev;
    let current: TTreeNode = this.root;
    // Loop until current is a "nil" node
    while (!RedBlackTree.isNilNode(current)) {
      prev = current;
      // Walk the tree
      if (newNode.key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    // Set parent
    const parent: TTreeNode = prev;
    newNode.parent = parent;
    if (newNode.key < parent.key) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
    // Create leafs for new node & set color
    newNode.left = new RedBlackTreeNode();
    newNode.right = new RedBlackTreeNode();
    newNode.color = ColorEnums.RED;
    // Fix tree to ensure it doesn't violate the principles of a R-B Tree
    this.insertFixUp(newNode);
    return this;
  }

  insertFixUp(node: TTreeNode): void {
    let currentNode = node;
    let uncle;

    while (currentNode.parent != null && currentNode.parent.color === ColorEnums.RED) {
      const isParentLeftChild = currentNode.parent === currentNode.parent.parent.left;
      const uncleRelativePos = isParentLeftChild
        ? DirectionConstants.RIGHT
        : DirectionConstants.LEFT;
      uncle = currentNode.parent.parent[uncleRelativePos];
      if (uncle != null && uncle.color === ColorEnums.RED) {
        /*
         * Case 1, the current node and both it's parents are red, so re-color it
         * to black, both its parents to red, and its grand-parent to black.
         */
        currentNode.parent.color = ColorEnums.BLACK;
        uncle.color = ColorEnums.BLACK;
        currentNode.parent.parent.color = ColorEnums.RED;
        currentNode = currentNode.parent.parent;
        continue;
      }
      if (currentNode === currentNode.parent[uncleRelativePos]) {
        /*
         * Case 2, the parent is red and not the grand-parent. Its parent will be
         * rotated left.
         */
        currentNode = currentNode.parent;
        if (isParentLeftChild) {
          this.leftRotate(currentNode);
        } else {
          this.rightRotate(currentNode);
        }
      }

      currentNode.parent.color = ColorEnums.BLACK;
      currentNode.parent.parent.color = ColorEnums.RED;
      /*
       * Case 3, we can determine the uncle is black and current node is red.
       * Therefore re-color the parent to black and right rotate the grand-parent
       * so that it becomes a child of the parent. Before rotating also color the
       * grand-parent red given it will adopt the black uncle.
       */
      if (isParentLeftChild) {
        this.rightRotate(currentNode.parent.parent);
      } else {
        this.leftRotate(currentNode.parent.parent);
      }
    }
    // The root should always be defined, but this check makes flow happy
    if (this.root) {
      this.root.color = ColorEnums.BLACK;
      this.root.parent = null;
    }
  }

  _rotate(node: TTreeNode, direction: TLeft | TRight): void {
    // Edge cases
    if (RedBlackTree.isNilNode(node)) {
      throw new Error('Cannot rotate leaf node');
    }
    const { LEFT, RIGHT } = DirectionEnums;
    if (direction !== LEFT && direction !== RIGHT) {
      throw new Error('Rotate requires a specified direction');
    }
    // Orient rotation
    let west;
    let east;
    switch (direction) {
      case LEFT:
        west = DirectionConstants.LEFT;
        east = DirectionConstants.RIGHT;
        break;
      case RIGHT:
        west = DirectionConstants.RIGHT;
        east = DirectionConstants.LEFT;
        break;
      default:
    }
    // Start rotation
    const pivot = node[east];
    if (!pivot) {
      throw new Error('Cannot rotate without a pivot');
    }
    // Deal with children
    if (!RedBlackTree.isNilNode(pivot[west])) {
      // Set sub-left subtree parent
      pivot[west].parent = node;
    }
    // Set node's right sub-tree to pivot's left subtree
    node[east] = pivot[west];
    // Deal with parents
    pivot.parent = node.parent;
    if (node.parent == null) {
      // Set the root to the pivot
      this.root = pivot;
    } else if (node === node.parent[west]) {
      // Is the left node of parent
      node.parent[west] = pivot;
    } else {
      node.parent[east] = pivot;
    }
    // Deal with eachother
    pivot[west] = node;
    node.parent = pivot;
  }
}

export default RedBlackTree;
