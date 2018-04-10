import { expect } from 'chai';
import { BinarySearchTree } from '../';

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

  describe('has', () => {
    it('returns true if a value is not present in the tree', () => {
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
    it('returns false for non-numerical values', () => {
      expect(bSearchTree.has(undefined)).to.equal(false);
      expect(bSearchTree.has(null)).to.equal(false);
      expect(bSearchTree.has(true)).to.equal(false);
      expect(bSearchTree.has('a')).to.equal(false);
      expect(bSearchTree.has({})).to.equal(false);
      expect(bSearchTree.has([])).to.equal(false);
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

  describe('delete', () => {
    it('removes a node from the tree');
    it('ensures the state of the tree is updated correctly');
  });
});
