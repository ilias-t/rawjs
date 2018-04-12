import { expect } from 'chai';
import BinarySearchTree from './';
import BinarySearchTreeNode from './BinarySearchTreeNode';

describe('BinarySearchTree', () => {
  let sampleTree;
  let emptyTree;
  beforeEach(() => {
    sampleTree = new BinarySearchTree();
    sampleTree
      .insert(2)
      .insert(1)
      .insert(3);
    emptyTree = new BinarySearchTree();
  });

  describe('get', () => {
    it('returns the node containing the queried value', () => {
      const node1 = sampleTree.get(1);
      const node3 = sampleTree.get(3);
      expect(node1).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(node3).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(node1.value).to.equal(1);
      expect(node3.value).to.equal(3);
    });
    it('returns the parent node of the queried value, when present', () => {
      const node1 = sampleTree.get(1);
      const node2 = sampleTree.get(2);
      const node3 = sampleTree.get(3);
      expect(node2.parent).to.equal(null);
      expect(node1.parent).to.equal(node2);
      expect(node3.parent).to.equal(node2);
    });
    it('returns null if a value is not present in the tree', () => {
      const node0 = sampleTree.get(0);
      expect(node0).to.equal(null);
      const node4 = sampleTree.get(4);
      expect(node4).to.equal(null);
    });
    it('handles an empty tree', () => {
      const node = emptyTree.get(1);
      expect(node).to.equal(null);
    });
    it('throws an error for non-numerical values', () => {
      expect(() => sampleTree.get(undefined)).to.throw();
      expect(() => sampleTree.get(null)).to.throw();
      expect(() => sampleTree.get(true)).to.throw();
      expect(() => sampleTree.get('a')).to.throw();
      expect(() => sampleTree.get({})).to.throw();
      expect(() => sampleTree.get([])).to.throw();
    });
  });

  describe('has', () => {
    it('returns true if a value is present in the tree', () => {
      expect(sampleTree.has(1)).to.equal(true);
      expect(sampleTree.has(3)).to.equal(true);
    });
    it('returns false if a value is not present in the tree', () => {
      expect(sampleTree.has(0)).to.equal(false);
      expect(sampleTree.has(4)).to.equal(false);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.has(1)).to.equal(false);
    });
    it('throws an error for non-numerical values', () => {
      expect(() => sampleTree.has(undefined)).to.throw();
      expect(() => sampleTree.has(null)).to.throw();
      expect(() => sampleTree.has(true)).to.throw();
      expect(() => sampleTree.has('a')).to.throw();
      expect(() => sampleTree.has({})).to.throw();
      expect(() => sampleTree.has([])).to.throw();
    });
  });

  describe('insert', () => {
    it('only supports inserting numbers', () => {
      expect(() => sampleTree.insert(undefined)).to.throw();
      expect(() => sampleTree.insert(null)).to.throw();
      expect(() => sampleTree.insert(true)).to.throw();
      expect(() => sampleTree.insert('a')).to.throw();
      expect(() => sampleTree.insert({})).to.throw();
      expect(() => sampleTree.insert([])).to.throw();
    });
    it('inserts a node into the tree', () => {
      expect(sampleTree.has(4)).to.equal(false);
      sampleTree.insert(4);
      expect(sampleTree.has(4)).to.equal(true);
    });
    it('returns itself to allow for method chaining', () => {
      expect(sampleTree.insert(4)).to.equal(sampleTree);
    });
    it('Does not insert the value if already present', () => {
      expect(() => sampleTree.insert(1)).to.not.throw();
    });
  });

  describe('min', () => {
    it('returns the minimum value contained in the tree', () => {
      const min = sampleTree.min();
      expect(min).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(min.value).to.equal(1);
      sampleTree.insert(0);
      expect(sampleTree.min().value).to.equal(0);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.min()).to.equal(null);
    });
  });

  describe('max', () => {
    it('returns the maximum value contained in the tree', () => {
      const max = sampleTree.max();
      expect(max).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(max.value).to.equal(3);
      sampleTree.insert(4);
      expect(sampleTree.max().value).to.equal(4);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.max()).to.equal(null);
    });
  });

  describe('remove', () => {
    it('returns null if the node is not present in the tree', () => {
      expect(sampleTree.remove(0)).to.equal(null);
      expect(sampleTree.remove(10)).to.equal(null);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.remove(1)).to.equal(null);
    });
    it('returns the node it removed', () => {
      // Removed node is returned
      const removedNode = sampleTree.remove(1);
      expect(removedNode).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(removedNode.value).to.equal(1);
    });
    it('throws an error for non-numerical values', () => {
      expect(() => sampleTree.remove(undefined)).to.throw();
      expect(() => sampleTree.remove(null)).to.throw();
      expect(() => sampleTree.remove(true)).to.throw();
      expect(() => sampleTree.remove('a')).to.throw();
      expect(() => sampleTree.remove({})).to.throw();
      expect(() => sampleTree.remove([])).to.throw();
    });
    context('a node is removed with no children', () => {
      it('removes a left node and updates the state correctly', () => {
        // Node is removed
        expect(sampleTree.has(1)).to.equal(true);
        sampleTree.remove(1);
        expect(sampleTree.has(1)).to.equal(false);
        // State is updated correctly
        expect(sampleTree.root.value).to.equal(2);
        expect(sampleTree.root.right.value).to.equal(3);
        expect(sampleTree.root.left).to.equal(null);
      });
      it('removes a right node and updates the state correctly', () => {
        // Node is removed
        expect(sampleTree.has(3)).to.equal(true);
        sampleTree.remove(3);
        expect(sampleTree.has(3)).to.equal(false);
        // State is updated correctly
        expect(sampleTree.root.value).to.equal(2);
        expect(sampleTree.root.left.value).to.equal(1);
        expect(sampleTree.root.right).to.equal(null);
      });
    });

    context('a node is removed with one child', () => {
      let bTree;
      beforeEach(() => {
        bTree = new BinarySearchTree();
        bTree.insert(50);
        bTree.insert(20);
        bTree.insert(25);
        bTree.insert(70);
        bTree.insert(60);
        /*
         * Tree illustration
         *               50
         *           /        \
         *         20         70
         *           \       /
         *          25     60
         */
      });
      it('removes the node and updates the state correctly', () => {
        expect(bTree.has(20)).to.equal(true);
        bTree.remove(20);
        expect(bTree.root.left.value).to.equal(25);
        expect(bTree.has(70)).to.equal(true);
        bTree.remove(70);
        expect(bTree.root.right.value).to.equal(60);
      });
    });

    context('a node is removed with two children', () => {
      let bTree;
      beforeEach(() => {
        bTree = new BinarySearchTree();
        bTree.insert(50);
        bTree.insert(20);
        bTree.insert(10);
        bTree.insert(25);
        bTree.insert(70);
        bTree.insert(80);
        bTree.insert(60);
        bTree.insert(65);
        bTree.insert(62);
        /*
         * Tree illustration
         *               50
         *           /        \
         *         20         70
         *       /   \       /  \
         *     10   25     60   80
         *                   \
         *                   65
         *                  /
         *                62
         */
      });
      it('replaces the node with the left-most max or right-most min node', () => {
        // Remove 20
        expect(bTree.has(20)).to.equal(true);
        bTree.remove(20);
        expect(bTree.root.left.value).to.equal(10);
        const node10 = bTree.get(10);
        expect(node10.left).to.equal(null);
        expect(node10.right.value).to.equal(25);
        // Remove 70
        expect(bTree.has(70)).to.equal(true);
        bTree.remove(70);
        expect(bTree.has(70)).to.equal(false);
        expect(bTree.root.right.value).to.equal(65);
        const node65 = bTree.get(65);
        expect(node65.left.value).to.equal(60);
        expect(node65.right.value).to.equal(80);
      });
    });

    it('allows a root to be removed', () => {
      expect(sampleTree.root.value).to.equal(2);
      // Remove root
      const node2 = sampleTree.remove(2);
      // The node removed is returned
      expect(node2).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(node2.value).to.equal(2);
      // Keep removing the roots
      expect(sampleTree.root.value).to.equal(1);
      sampleTree.remove(1);
      expect(sampleTree.root.value).to.equal(3);
      // Ensure it works when removing the final root
      sampleTree.remove(3);
      expect(sampleTree.root).to.equal(null);
    });
  });
});
