/*
 * BinarySearchTree
 * @flow
 */

import { isNumber } from 'lodash';
import BinarySearchTreeNode from '../_private/BinarySearchTreeNode';

class BinarySearchTree {
  root: ?TTreeNode;

  static checkKeyIsValid(key: any) {
    if (!isNumber(key)) {
      throw new Error('Binary search tree only supports numerical values');
    }
  }

  constructor() {
    this.root = null;
  }

  /**
   * Inserts a key with the provided value into the tree. If the key is already present
   * it will replace the old value with the new one.
   */
  insert(
    key: number,
    value: any = null,
    currentNode: ?TTreeNode = this.root
  ): BinarySearchTree {
    BinarySearchTree.checkKeyIsValid(key);
    // Node to insert
    const node = new BinarySearchTreeNode(key, value);
    if (!currentNode) {
      // Is an empty tree
      this.root = node;
      return this;
    }
    const { left, right, key: currentKey } = currentNode;
    if (key < currentKey) {
      // Key is lesser, move left
      if (!left) {
        // A leaf has been reached, insert the node
        currentNode.left = node;
        node.parent = currentNode;
        return this;
      }
      // Otherwise, recursively insert to the left
      return this.insert(key, value, left);
    } else if (key > currentKey) {
      // Key is greater, move right
      if (!right) {
        // A leaf has been reached, insert the node
        currentNode.right = node;
        node.parent = currentNode;
        return this;
      }
      // Otherwise, recursively insert to the right
      return this.insert(key, value, right);
    }
    // Keys are equal, replace old value with new one
    currentNode.value = value;
    return this;
  }

  /**
   * Attempts to find the node with the key provided and return a result containing
   * both the node and its parent.
   */
  get(
    key: number,
    currentNode: ?TTreeNode = this.root,
    parentNode: ?TTreeNode = null
  ): ?TTreeNode {
    BinarySearchTree.checkKeyIsValid(key);

    if (!currentNode) {
      // Tree is empty
      return null;
    }

    const { left, right, key: currentKey } = currentNode;
    if (key < currentKey) {
      if (!left) {
        // Key not found
        return null;
      }
      // Keep searching to the left recursively
      return this.get(key, left, currentNode);
    } else if (key > currentKey) {
      if (!right) {
        // Key not found
        return null;
      }
      // Keep searching to the right recursively
      return this.get(key, right, currentNode);
    }
    // Key matches, so the node is found
    return currentNode;
  }

  /**
   * Returns whether or not the tree contains a specific value.
   */
  has(key: number): boolean {
    return !!this.get(key);
  }

  /**
   * Attempts to find node with the min key in the tree.
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
   * Attempts to find node with the max key in the tree.
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
   * Attempts to remove the node with the specified key. It will return null if no
   * node is found with that key.
   */
  remove(key: number, currentNode: ?TTreeNode = this.root): ?TTreeNode {
    BinarySearchTree.checkKeyIsValid(key);
    // Get the node with the key
    const node = this.get(key, currentNode);
    if (!node) {
      // No node was found with that key
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
    const replacementNode: TTreeNode = this.max(node.left) || this.min(node.right);
    // Cleanup to ensure there are not duplicate copies of the same node
    this.remove(replacementNode.key, node);
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
    // Point child to parent
    if (replacementNode) {
      replacementNode.parent = parent;
    }
    // Point parent to child
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

export default BinarySearchTree;
