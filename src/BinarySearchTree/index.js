/*
 * BinarySearchTree
 * @flow
 */

import { isNumber } from 'lodash';
import BinarySearchTreeNode from './BinarySearchTreeNode';

class BinarySearchTree {
  root: ?BinarySearchTreeNode;

  constructor() {
    this.root = null;
  }

  /**
   * Inserts a value into the tree, in the correct position.
   */
  insert = (
    value: number,
    currentNode: ?BinarySearchTreeNode = this.root
  ): BinarySearchTree => {
    this._checkInputIsValid(value);
    // Node to insert
    const node = new BinarySearchTreeNode(value);
    if (currentNode == null) {
      // Is an empty tree
      this.root = node;
      return this;
    }
    const { left, right, value: currentValue } = currentNode;
    if (value < currentValue) {
      // Value is lesser, move left
      if (left == null) {
        // A leaf has been reached, insert the node
        currentNode.left = node;
        return this;
      }
      // Otherwise, recursively insert to the left
      return this.insert(value, left);
    } else if (value > currentValue) {
      // Value is greater, move right
      if (right == null) {
        // A leaf has been reached, insert the node
        currentNode.right = node;
        return this;
      }
      // Otherwise, recursively insert to the right
      return this.insert(value, right);
    }
    // Don't do anything as values are equal
    return this;
  };

  /**
   * Returns a node based on the value provided.
   */
  get = (
    value: number,
    currentNode: ?BinarySearchTreeNode = this.root,
    previousNode: ?BinarySearchTreeNode = null
  ): ?{
    previous: ?BinarySearchTreeNode,
    node: BinarySearchTreeNode,
  } => {
    this._checkInputIsValid(value);

    if (currentNode == null) {
      // Tree is empty
      return null;
    }

    const { left, right, value: currentValue } = currentNode;
    if (value < currentValue) {
      if (left == null) {
        // Value not found
        return null;
      }
      // Keep searching to the left recursively
      return this.get(value, left, currentNode);
    } else if (value > currentValue) {
      if (right == null) {
        // Value not found
        return null;
      }
      // Keep searching to the right recursively
      return this.get(value, right, currentNode);
    }
    // Values are equal
    return { previous: previousNode, node: currentNode };
  };

  /**
   * Returns whether or not the tree contains a specific value.
   */
  has = (value: number): boolean => {
    return !!this.get(value);
  };

  /**
   * Returns the minimum value of the tree.
   */
  min = (currentNode: ?BinarySearchTreeNode = this.root): ?number => {
    if (currentNode == null) {
      // Tree is empty
      return null;
    }
    const { left, value } = currentNode;
    if (left == null) {
      return value;
    }
    return this.min(left);
  };

  /**
   * Returns the maximum value of the tree.
   */
  max = (currentNode: ?BinarySearchTreeNode = this.root): ?number => {
    if (currentNode == null) {
      // Tree is empty
      return null;
    }
    const { right, value } = currentNode;
    if (right == null) {
      return value;
    }
    return this.max(right);
  };

  remove = (value: number): ?BinarySearchTreeNode => {
    this._checkInputIsValid(value);
    const { root: rootNode } = this;
    if (rootNode == null) {
      return null;
    }
    // Get the node with the value
    const getNodeResult = this.get(value);
    if (getNodeResult == null) {
      // No node was found with that value
      return null;
    }
    const { previous, node } = getNodeResult;

    if (previous == null) {
      // Root is being removed
      if (rootNode.left) {
        this.root = rootNode.left;
        this.root.right = rootNode.right;
        return rootNode;
      } else if (rootNode.right) {
        this.root = rootNode.right;
        return rootNode;
      }
      this.root = null;
      return rootNode;
    }
    // Determine if the node is the left of right child of its parent
    const nodeIsLeftChild = previous.left === node;
    // Prefer replacing the removed node with its right child
    const replacementNode = node.right || node.left;
    if (nodeIsLeftChild) {
      previous.left = replacementNode;
    } else {
      previous.right = replacementNode;
    }
    return node;
  };

  _checkInputIsValid = (value: any) => {
    if (!isNumber(value)) {
      throw new Error('Binary search tree only supports numerical values');
    }
  };
}

export default BinarySearchTree;
