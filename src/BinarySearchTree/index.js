/*
 * BinarySearchTree
 * @flow
 */

import { isNumber } from 'lodash';
import { TreeNode } from '../';

class BinarySearchTree {
  root: ?TreeNode;

  constructor() {
    this.root = null;
  }

  insert = (value: number, currentNode: ?TreeNode = this.root): BinarySearchTree => {
    if (!isNumber(value)) {
      throw new Error('Binary search tree only supports numerical values');
    }
    // Node to insert
    const node = new TreeNode(value);
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

  has = (value: number, currentNode: ?TreeNode = this.root): boolean => {
    if (!isNumber(value) || currentNode == null) {
      // Either is an invalid value or the tree is empty
      return false;
    }

    const { left, right, value: currentValue } = currentNode;
    if (value < currentValue) {
      if (left == null) {
        // Value not found
        return false;
      }
      // Keep searching to the left recursively
      return this.has(value, left);
    } else if (value > currentValue) {
      if (right == null) {
        // Value not found
        return false;
      }
      // Keep searching to the right recursively
      return this.has(value, right);
    }
    // Values are equal
    return true;
  };

  min = (currentNode: ?TreeNode = this.root): ?number => {
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

  max = (currentNode: ?TreeNode = this.root): ?number => {
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
}

export default BinarySearchTree;
