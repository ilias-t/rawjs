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
    if (!currentNode) {
      // Is an empty tree
      this.root = node;
      return this;
    }
    const { left, right, value: currentValue } = currentNode;
    if (value < currentValue) {
      // Value is lesser, move left
      if (!left) {
        // A leaf has been reached, insert the node
        currentNode.left = node;
        return this;
      }
      // Otherwise, recursively insert to the left
      return this.insert(value, left);
    } else if (value > currentValue) {
      // Value is greater, move right
      if (!right) {
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
   * Attempts to find the node with the value provided and return a result containing
   * both the node and its parent.
   */
  get = (
    value: ?number,
    currentNode: ?BinarySearchTreeNode = this.root,
    parentNode: ?BinarySearchTreeNode = null
  ): ?BinarySearchTreeNode => {
    this._checkInputIsValid(value);

    if (!currentNode) {
      // Tree is empty
      return null;
    }

    const { left, right, value: currentValue } = currentNode;
    if (value < currentValue) {
      if (!left) {
        // Value not found
        return null;
      }
      // Keep searching to the left recursively
      return this.get(value, left, currentNode);
    } else if (value > currentValue) {
      if (!right) {
        // Value not found
        return null;
      }
      // Keep searching to the right recursively
      return this.get(value, right, currentNode);
    }
    // Values are equal
    currentNode.parent = parentNode;
    return currentNode;
  };

  /**
   * Returns whether or not the tree contains a specific value.
   */
  has = (value: number): boolean => {
    return !!this.get(value);
  };

  /**
   * Attempts to find node with the minimum value in the tree and return a result
   * containing both the node and its parent.
   */
  min = (currentNode: ?BinarySearchTreeNode = this.root): ?BinarySearchTreeNode => {
    if (!currentNode) {
      // Tree is empty
      return null;
    }
    const { left } = currentNode;
    if (!left) {
      return currentNode;
    }
    return this.min(left);
  };

  /**
   * Attempts to find node with the maximum value in the tree and return a result
   * containing both the node and its parent.
   */
  max = (currentNode: ?BinarySearchTreeNode = this.root): ?BinarySearchTreeNode => {
    if (!currentNode) {
      // Tree is empty
      return null;
    }
    const { right } = currentNode;
    if (!right) {
      return currentNode;
    }
    return this.max(right);
  };

  /**
   * Attempts to remove the node with the specified value. It will return null if no
   * node is found with that value.
   */
  remove = (
    value: ?number,
    currentNode: ?BinarySearchTreeNode = this.root
  ): ?BinarySearchTreeNode => {
    this._checkInputIsValid(value);
    // Get the node with the value
    const node = this.get(value, currentNode);
    if (!node) {
      // No node was found with that value
      return null;
    }
    const { parent } = node;
    // Determine if node is to the left or right child of its parent
    const nodeIsLeftChild = (parent && parent.left === node) || null;
    // Helper function to ensure parent references the correct node after removal
    const reorientParent = (replacementNode: ?BinarySearchTreeNode): void => {
      if (parent) {
        if (nodeIsLeftChild) {
          parent.left = replacementNode;
        } else {
          parent.right = replacementNode;
        }
      } else {
        this.root = replacementNode;
      }
    };
    // First, check if node has no children
    if (!node.left && !node.right) {
      reorientParent(null);
      return node;
    }
    // Second, check if node to remove has only one child
    if ((!node.left && node.right) || (node.left && !node.right)) {
      const replacementNode = node.left || node.right;
      reorientParent(replacementNode);
      return node;
    }
    /*
     * Lastly, determine the node has two children. Deterministically always choose to
     * replace from the left side.
     */
    const replacementNode =
      this.max(node.left) || this.min(node.right) || new BinarySearchTreeNode();
    // Cleanup to ensure there are not duplicate copies of the same node
    this.remove(replacementNode.value, node);
    // Swap node with replacement node
    if (node.left !== replacementNode) {
      replacementNode.left = node.left;
    }
    if (node.right !== replacementNode) {
      replacementNode.right = node.right;
    }
    reorientParent(replacementNode);
    return node;
  };

  _checkInputIsValid = (value: any) => {
    if (!isNumber(value)) {
      throw new Error('Binary search tree only supports numerical values');
    }
  };
}

export default BinarySearchTree;
