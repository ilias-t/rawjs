import { expect } from 'chai';
import BinarySearchTree from './';
import BinarySearchTreeNode from './BinarySearchTreeNode';

describe('BinarySearchTree', () => {
  let bSearchTree;
  let emptyTree;
  beforeEach(() => {
    bSearchTree = new BinarySearchTree();
    bSearchTree
      .insert(2)
      .insert(1)
      .insert(3);
    emptyTree = new BinarySearchTree();
  });

  describe('get', () => {
    it('returns the node containing the queried value', () => {
      const { node: node1 } = bSearchTree.get(1);
      const { node: node3 } = bSearchTree.get(3);
      expect(node1).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(node3).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(node1.value).to.equal(1);
      expect(node3.value).to.equal(3);
    });
    it('returns the previous node of the queried value, when present', () => {
      const { previous: prevOfNode1 } = bSearchTree.get(1);
      const { previous: prevOfNode2, node: node2 } = bSearchTree.get(2);
      const { previous: prevOfNode3 } = bSearchTree.get(3);
      expect(prevOfNode2).to.equal(null);
      expect(prevOfNode1).to.equal(node2);
      expect(prevOfNode3).to.equal(node2);
    });
    it('returns false if a value is not present in the tree', () => {
      expect(bSearchTree.get(0)).to.equal(null);
      expect(bSearchTree.get(4)).to.equal(null);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.get(1)).to.equal(null);
    });
    it('throws an error for non-numerical values', () => {
      expect(() => bSearchTree.get(undefined)).to.throw();
      expect(() => bSearchTree.get(null)).to.throw();
      expect(() => bSearchTree.get(true)).to.throw();
      expect(() => bSearchTree.get('a')).to.throw();
      expect(() => bSearchTree.get({})).to.throw();
      expect(() => bSearchTree.get([])).to.throw();
    });
  });

  describe('has', () => {
    it('returns true if a value is present in the tree', () => {
      expect(bSearchTree.has(1)).to.equal(true);
      expect(bSearchTree.has(3)).to.equal(true);
    });
    it('returns false if a value is not present in the tree', () => {
      expect(bSearchTree.has(0)).to.equal(false);
      expect(bSearchTree.has(4)).to.equal(false);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.has(1)).to.equal(false);
    });
    it('throws an error for non-numerical values', () => {
      expect(() => bSearchTree.has(undefined)).to.throw();
      expect(() => bSearchTree.has(null)).to.throw();
      expect(() => bSearchTree.has(true)).to.throw();
      expect(() => bSearchTree.has('a')).to.throw();
      expect(() => bSearchTree.has({})).to.throw();
      expect(() => bSearchTree.has([])).to.throw();
    });
  });

  describe('insert', () => {
    it('only supports inserting numbers', () => {
      expect(() => bSearchTree.insert(undefined)).to.throw();
      expect(() => bSearchTree.insert(null)).to.throw();
      expect(() => bSearchTree.insert(true)).to.throw();
      expect(() => bSearchTree.insert('a')).to.throw();
      expect(() => bSearchTree.insert({})).to.throw();
      expect(() => bSearchTree.insert([])).to.throw();
    });
    it('inserts a node into the tree', () => {
      expect(bSearchTree.has(4)).to.equal(false);
      bSearchTree.insert(4);
      expect(bSearchTree.has(4)).to.equal(true);
    });
    it('returns itself to allow for method chaining', () => {
      expect(bSearchTree.insert(4)).to.equal(bSearchTree);
    });
    it('Does not insert the value if already present', () => {
      expect(() => bSearchTree.insert(1)).to.not.throw();
    });
  });

  describe('min', () => {
    it('returns the minimum value contained in the tree', () => {
      expect(bSearchTree.min()).to.equal(1);
      bSearchTree.insert(0);
      expect(bSearchTree.min()).to.equal(0);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.min()).to.equal(null);
    });
  });

  describe('max', () => {
    it('returns the maximum value contained in the tree', () => {
      expect(bSearchTree.max()).to.equal(3);
      bSearchTree.insert(4);
      expect(bSearchTree.max()).to.equal(4);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.max()).to.equal(null);
    });
  });

  describe('remove', () => {
    it('removes a node from the tree', () => {
      bSearchTree.insert(0);
      bSearchTree.insert(4);
      bSearchTree.insert(5);
      // Remove 1
      expect(bSearchTree.has(1)).to.equal(true);
      const node1 = bSearchTree.remove(1);
      expect(node1).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(node1.value).to.equal(1);
      expect(bSearchTree.has(1)).to.equal(false);
      expect(bSearchTree.has(0)).to.equal(true);
      // Remove 3
      expect(bSearchTree.has(3)).to.equal(true);
      bSearchTree.remove(3);
      expect(bSearchTree.has(3)).to.equal(false);
      expect(bSearchTree.has(4)).to.equal(true);
      // Remove 5
      expect(bSearchTree.has(5)).to.equal(true);
      bSearchTree.remove(5);
      expect(bSearchTree.has(5)).to.equal(false);
    });
    it('returns null if the node is not present in the tree', () => {
      expect(bSearchTree.remove(0)).to.equal(null);
      expect(bSearchTree.remove(10)).to.equal(null);
    });
    it('handles removing the root', () => {
      expect(bSearchTree.root.value).to.equal(2);
      // Remove root
      const node2 = bSearchTree.remove(2);
      // The node removed is returned
      expect(node2).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(node2.value).to.equal(2);
      // Keep removing the roots
      expect(bSearchTree.root.value).to.equal(1);
      bSearchTree.remove(1);
      expect(bSearchTree.root.value).to.equal(3);
      // Ensure it works when removing the final root
      bSearchTree.remove(3);
      expect(bSearchTree.root).to.equal(null);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.remove(1)).to.equal(null);
    });
    it('throws an error for non-numerical values', () => {
      expect(() => bSearchTree.remove(undefined)).to.throw();
      expect(() => bSearchTree.remove(null)).to.throw();
      expect(() => bSearchTree.remove(true)).to.throw();
      expect(() => bSearchTree.remove('a')).to.throw();
      expect(() => bSearchTree.remove({})).to.throw();
      expect(() => bSearchTree.remove([])).to.throw();
    });
    it('ensures the state of the tree is updated correctly');
  });

  describe('toObject', () => {
    it('converts the tree into a javascript object');
    it('handles an empty tree');
  });
});
