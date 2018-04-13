/*
 * BinarySearchTree
 * @flow
 */

import { isNumber } from 'lodash';
import BinarySearchTreeNode from '../_private/BinarySearchTreeNode';

class BinarySearchTree {
  root: ?TTreeNode;

  static checkInputIsValid(value: any) {
    if (!isNumber(value)) {
      throw new Error('Binary search tree only supports numerical values');
    }
  }

  constructor() {
    this.root = null;
  }

  /**
   * Inserts a value into the tree, in the correct position.
   */
  insert(value: number, currentNode: ?TTreeNode = this.root): BinarySearchTree {
    BinarySearchTree.checkInputIsValid(value);
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
  }

  /**
   * Attempts to find the node with the value provided and return a result containing
   * both the node and its parent.
   */
  get(
    value: ?number,
    currentNode: ?TTreeNode = this.root,
    parentNode: ?TTreeNode = null
  ): ?TTreeNode {
    BinarySearchTree.checkInputIsValid(value);

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
  }

  /**
   * Returns whether or not the tree contains a specific value.
   */
  has(value: number): boolean {
    return !!this.get(value);
  }

  /**
   * Attempts to find node with the minimum value in the tree and return a result
   * containing both the node and its parent.
   */
  min(currentNode: ?TTreeNode = this.root): ?TTreeNode {
    if (!currentNode) {
      // Tree is empty
      return null;
    }
    const { left } = currentNode;
    if (!left) {
      return currentNode;
    }
    return this.min(left);
  }

  /**
   * Attempts to find node with the maximum value in the tree and return a result
   * containing both the node and its parent.
   */
  max(currentNode: ?TTreeNode = this.root): ?TTreeNode {
    if (!currentNode) {
      // Tree is empty
      return null;
    }
    const { right } = currentNode;
    if (!right) {
      return currentNode;
    }
    return this.max(right);
  }

  /**
   * Attempts to remove the node with the specified value. It will return null if no
   * node is found with that value.
   */
  remove(value: ?number, currentNode: ?TTreeNode = this.root): ?TTreeNode {
    BinarySearchTree.checkInputIsValid(value);
    // Get the node with the value
    const node = this.get(value, currentNode);
    if (!node) {
      // No node was found with that value
      return null;
    }
    // First, check if node has no children
    if (!node.left && !node.right) {
      this._transplant(node, null);
      return node;
    }
    // Second, check if node to remove has only one child
    if ((!node.left && node.right) || (node.left && !node.right)) {
      const replacementNode = node.left || node.right;
      this._transplant(node, replacementNode);
      return node;
    }
    /*
     * Lastly, determine the node has two children. Deterministically always choose to
     * prioritize replacing from the left side.
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
    this._transplant(node, replacementNode);
    return node;
  }

  _transplant(existingNode: TTreeNode, replacementNode: ?TTreeNode): void {
    const { parent } = existingNode;
    const nodeIsLeftChild = (parent && parent.left === existingNode) || null;
    if (parent) {
      if (nodeIsLeftChild) {
        parent.left = replacementNode;
      } else {
        parent.right = replacementNode;
      }
    } else {
      this.root = replacementNode;
    }
  }
}

export { BinarySearchTree as default };
