import { expect } from 'chai';

import RedBlackTree from './';
import BinarySearchTree from '../BinarySearchTree';
import { ColorEnums } from '../_private/RedBlackTreeNode';

describe('RedBlackTree', () => {
  let rbt;
  let bst;
  beforeEach(() => {
    rbt = new RedBlackTree();
    bst = new BinarySearchTree();
  });
  it('inherits from a BinarySearchTree', () => {
    expect(rbt).to.be.an.instanceOf(RedBlackTree);
    expect(rbt).to.be.an.instanceOf(BinarySearchTree);
  });
  it('inherits some of its methods', () => {
    expect(rbt.get).to.equal(bst.get);
  });
  describe('insert', () => {
    beforeEach(() => {
      rbt
        .insert(11)
        .insert(2)
        .insert(14)
        .insert(1)
        .insert(7)
        .insert(15)
        .insert(5)
        .insert(8);
      /*
       * Tree illustration - nodes in parentheses are black
       *              (11)
       *           /       \
       *          2        14
       *       /   \         \
       *     (1)   (7)       (15)
       *          /   \
       *         5     8
       */
    });
    it('has its own insert method', () => {
      expect(rbt.insert).to.not.equal(bst.insert);
    });
    it('handles an insert that hits every type of possible fix condition', () => {
      // Example taken from Introduction to Algorithms Third Edition Figure 13.4
      expect(rbt.root.key).to.equal(11);
      expect(rbt.root.left.key).to.equal(2);
      expect(rbt.root.right.key).to.equal(14);
      rbt.insert(4);
      /*
       * Resulting tree
       *               (7)
       *           /         \
       *          2          11
       *       /    \      /    \
       *     (1)    (5)  (8)    (14)
       *           /             \
       *          4              15
       */
      expect(rbt.root.key).to.equal(7);
      expect(rbt.root.left.key).to.equal(2);
      expect(rbt.root.right.key).to.equal(11);
      expect(rbt.get(1).color).to.equal(ColorEnums.BLACK);
      expect(rbt.get(5).color).to.equal(ColorEnums.BLACK);
      expect(rbt.get(8).color).to.equal(ColorEnums.BLACK);
      expect(rbt.get(14).color).to.equal(ColorEnums.BLACK);
      expect(rbt.get(15).color).to.equal(ColorEnums.RED);
      expect(rbt.get(4).color).to.equal(ColorEnums.RED);
    });
  });
});
