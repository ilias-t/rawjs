import { expect } from 'chai';
import BinarySearchTree from './';
import BinarySearchTreeNode from '../_private/BinarySearchTreeNode';

describe('BinarySearchTree', () => {
  let sampleBST;
  let emptyTree;
  beforeEach(() => {
    sampleBST = new BinarySearchTree();
    sampleBST
      .insert(2)
      .insert(1)
      .insert(3);
    emptyTree = new BinarySearchTree();
  });

  describe('get', () => {
    it('returns the node containing the queried value', () => {
      const node1 = sampleBST.get(1);
      const node3 = sampleBST.get(3);
      expect(node1).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(node3).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(node1.value).to.equal(1);
      expect(node3.value).to.equal(3);
    });
    it('returns the parent node of the queried value, when present', () => {
      const node1 = sampleBST.get(1);
      const node2 = sampleBST.get(2);
      const node3 = sampleBST.get(3);
      expect(node2.parent).to.equal(null);
      expect(node1.parent).to.equal(node2);
      expect(node3.parent).to.equal(node2);
    });
    it('returns null if a value is not present in the tree', () => {
      const node0 = sampleBST.get(0);
      expect(node0).to.equal(null);
      const node4 = sampleBST.get(4);
      expect(node4).to.equal(null);
    });
    it('handles an empty tree', () => {
      const node = emptyTree.get(1);
      expect(node).to.equal(null);
    });
    it('throws an error for non-numerical values', () => {
      expect(() => sampleBST.get(undefined)).to.throw();
      expect(() => sampleBST.get(null)).to.throw();
      expect(() => sampleBST.get(true)).to.throw();
      expect(() => sampleBST.get('a')).to.throw();
      expect(() => sampleBST.get({})).to.throw();
      expect(() => sampleBST.get([])).to.throw();
    });
  });

  describe('has', () => {
    it('returns true if a value is present in the tree', () => {
      expect(sampleBST.has(1)).to.equal(true);
      expect(sampleBST.has(3)).to.equal(true);
    });
    it('returns false if a value is not present in the tree', () => {
      expect(sampleBST.has(0)).to.equal(false);
      expect(sampleBST.has(4)).to.equal(false);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.has(1)).to.equal(false);
    });
    it('throws an error for non-numerical values', () => {
      expect(() => sampleBST.has(undefined)).to.throw();
      expect(() => sampleBST.has(null)).to.throw();
      expect(() => sampleBST.has(true)).to.throw();
      expect(() => sampleBST.has('a')).to.throw();
      expect(() => sampleBST.has({})).to.throw();
      expect(() => sampleBST.has([])).to.throw();
    });
  });

  describe('insert', () => {
    it('only supports inserting numbers', () => {
      expect(() => sampleBST.insert(undefined)).to.throw();
      expect(() => sampleBST.insert(null)).to.throw();
      expect(() => sampleBST.insert(true)).to.throw();
      expect(() => sampleBST.insert('a')).to.throw();
      expect(() => sampleBST.insert({})).to.throw();
      expect(() => sampleBST.insert([])).to.throw();
    });
    it('inserts a node into the tree', () => {
      expect(sampleBST.has(4)).to.equal(false);
      sampleBST.insert(4);
      expect(sampleBST.has(4)).to.equal(true);
    });
    it('returns itself to allow for method chaining', () => {
      expect(sampleBST.insert(4)).to.equal(sampleBST);
    });
    it('Does not insert the value if already present', () => {
      expect(() => sampleBST.insert(1)).to.not.throw();
    });
  });

  describe('min', () => {
    it('returns the minimum value contained in the tree', () => {
      const min = sampleBST.min();
      expect(min).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(min.value).to.equal(1);
      sampleBST.insert(0);
      expect(sampleBST.min().value).to.equal(0);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.min()).to.equal(null);
    });
  });

  describe('max', () => {
    it('returns the maximum value contained in the tree', () => {
      const max = sampleBST.max();
      expect(max).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(max.value).to.equal(3);
      sampleBST.insert(4);
      expect(sampleBST.max().value).to.equal(4);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.max()).to.equal(null);
    });
  });

  describe('remove', () => {
    it('returns null if the node is not present in the tree', () => {
      expect(sampleBST.remove(0)).to.equal(null);
      expect(sampleBST.remove(10)).to.equal(null);
    });
    it('handles an empty tree', () => {
      expect(emptyTree.remove(1)).to.equal(null);
    });
    it('returns the node it removed', () => {
      // Removed node is returned
      const removedNode = sampleBST.remove(1);
      expect(removedNode).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(removedNode.value).to.equal(1);
    });
    it('throws an error for non-numerical values', () => {
      expect(() => sampleBST.remove(undefined)).to.throw();
      expect(() => sampleBST.remove(null)).to.throw();
      expect(() => sampleBST.remove(true)).to.throw();
      expect(() => sampleBST.remove('a')).to.throw();
      expect(() => sampleBST.remove({})).to.throw();
      expect(() => sampleBST.remove([])).to.throw();
    });
    context('a node is removed with no children', () => {
      it('removes a left node and updates the state correctly', () => {
        // Node is removed
        expect(sampleBST.has(1)).to.equal(true);
        sampleBST.remove(1);
        expect(sampleBST.has(1)).to.equal(false);
        // State is updated correctly
        expect(sampleBST.root.value).to.equal(2);
        expect(sampleBST.root.right.value).to.equal(3);
        expect(sampleBST.root.left).to.equal(null);
      });
      it('removes a right node and updates the state correctly', () => {
        // Node is removed
        expect(sampleBST.has(3)).to.equal(true);
        sampleBST.remove(3);
        expect(sampleBST.has(3)).to.equal(false);
        // State is updated correctly
        expect(sampleBST.root.value).to.equal(2);
        expect(sampleBST.root.left.value).to.equal(1);
        expect(sampleBST.root.right).to.equal(null);
      });
    });

    context('a node is removed with one child', () => {
      let bst;
      beforeEach(() => {
        bst = new BinarySearchTree();
        bst.insert(50);
        bst.insert(20);
        bst.insert(25);
        bst.insert(70);
        bst.insert(60);
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
        expect(bst.has(20)).to.equal(true);
        bst.remove(20);
        expect(bst.root.left.value).to.equal(25);
        expect(bst.has(70)).to.equal(true);
        bst.remove(70);
        expect(bst.root.right.value).to.equal(60);
      });
    });

    context('a node is removed with two children', () => {
      let bst;
      beforeEach(() => {
        bst = new BinarySearchTree();
        bst.insert(50);
        bst.insert(20);
        bst.insert(10);
        bst.insert(25);
        bst.insert(70);
        bst.insert(80);
        bst.insert(60);
        bst.insert(65);
        bst.insert(62);
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
        expect(bst.has(20)).to.equal(true);
        bst.remove(20);
        expect(bst.root.left.value).to.equal(10);
        const node10 = bst.get(10);
        expect(node10.left).to.equal(null);
        expect(node10.right.value).to.equal(25);
        // Remove 70
        expect(bst.has(70)).to.equal(true);
        bst.remove(70);
        expect(bst.has(70)).to.equal(false);
        expect(bst.root.right.value).to.equal(65);
        const node65 = bst.get(65);
        expect(node65.left.value).to.equal(60);
        expect(node65.right.value).to.equal(80);
      });
    });

    it('allows a root to be removed', () => {
      expect(sampleBST.root.value).to.equal(2);
      // Remove root
      const node2 = sampleBST.remove(2);
      // The node removed is returned
      expect(node2).to.be.an.instanceOf(BinarySearchTreeNode);
      expect(node2.value).to.equal(2);
      // Keep removing the roots
      expect(sampleBST.root.value).to.equal(1);
      sampleBST.remove(1);
      expect(sampleBST.root.value).to.equal(3);
      // Ensure it works when removing the final root
      sampleBST.remove(3);
      expect(sampleBST.root).to.equal(null);
    });
  });
});
