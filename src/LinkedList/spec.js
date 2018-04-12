import { expect } from 'chai';
import LinkedList from './';
import LinkedListNode from '../private/LinkedListNode';

describe('LinkedList', () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
    list
      .insert('a')
      .insert('b')
      .insert('c');
  });

  describe('length', () => {
    it('returns the number of nodes in the list', () => {
      const emptyList = new LinkedList();
      expect(emptyList.length).to.equal(0);
      expect(list.length).to.equal(3);
    });
  });

  describe('#insert', () => {
    it('inserts a node at the end of the list', () => {
      list.insert('Ω');
      expect(list.findAt(list.length - 1).value).to.equal('Ω');
    });
    it('returns itself to allow for method chaining', () => {
      expect(list.insert('d')).to.equal(list);
    });
  });

  describe('#insertAt', () => {
    it('inserts a node into the desired location of the list', () => {
      list.insertAt('∆', 1);
      expect(list.findAt(1).value).to.equal('∆');
      list.insertAt('∑', 3);
      expect(list.findAt(3).value).to.equal('∑');
      expect(list.length).to.equal(5);
    });
    it('expects a index to be provided', () => {
      expect(() => list.insertAt('∆')).to.throw();
      expect(() => list.insertAt('∆', null)).to.throw();
      expect(() => list.insertAt('∆', '3')).to.throw();
    });
    it('returns itself to allow for method chaining', () => {
      expect(list.insertAt('∆', 1)).to.equal(list);
    });
  });

  describe('#insertFirst', () => {
    it('inserts a node at the beginning of the list and increments the length', () => {
      list.insertFirst('α');
      expect(list.findAt(0).value).to.equal('α');
      expect(list.findAt(1).value).to.equal('a');
      expect(list.findAt(2).value).to.equal('b');
      expect(list.findAt(3).value).to.equal('c');
      expect(list.length).to.equal(4);
    });
    it('returns itself to allow for method chaining', () => {
      expect(list.insertFirst('α')).to.equal(list);
    });
  });

  describe('#get', () => {
    it('returns the first node found, matching the value provided', () => {
      const nodeA = list.get('a');
      const nodeB = list.get('b');
      const nodeC = list.get('c');
      expect(nodeA.value).to.equal('a');
      expect(nodeA.next).to.equal(nodeB);
      expect(nodeC).to.be.an.instanceOf(LinkedListNode);
    });
    it('returns null if nothing matches', () => {
      expect(list.get('Ω')).to.equal(null);
    });
  });

  describe('#findAt', () => {
    it('returns the node contained at a specified position in the list', () => {
      const Node0 = list.findAt(0);
      const Node1 = list.findAt(1);
      expect(Node0.value).to.equal('a');
      expect(Node0.next).to.equal(Node1);
      expect(Node1.value).to.equal('b');
    });
  });

  describe('#positionOf', () => {
    it('returns the position of the node with matching value', () => {
      expect(list.positionOf('a')).to.equal(0);
      expect(list.positionOf('b')).to.equal(1);
    });
    it('always returns the index of the first value found', () => {
      list.insert('a');
      expect(list.positionOf('a')).to.equal(0);
    });
    it('handles undefined values', () => {
      expect(list.positionOf(undefined)).to.equal(-1);
    });
    it('handles values that are not present', () => {
      expect(list.positionOf('!')).to.equal(-1);
    });
  });

  describe('#deleteAt', () => {
    it('removes a specified element from the list & returns it', () => {
      expect(list.deleteAt(0)).to.equal('a');
      expect(list.deleteAt(1)).to.equal('c');
      expect(list.length).to.equal(1);
    });
    it('can remove the node from the list', () => {
      expect(list.deleteAt(list.length - 1)).to.equal('c');
    });
    it('handles an empty list', () => {
      const emptyList = new LinkedList();
      expect(emptyList.length).to.equal(0);
      expect(emptyList.deleteAt(0)).to.equal(null);
    });
    it('throws an error if not provided a valid position', () => {
      expect(() => list.deleteAt()).to.throw();
      expect(() => list.deleteAt(-1)).to.throw();
      expect(() => list.deleteAt('a')).to.throw();
    });
  });

  describe('#delete', () => {
    it('removes a specified element from the list & returns it', () => {
      const listLength = list.length;
      expect(list.delete('a')).to.equal('a');
      expect(list.length).to.equal(listLength - 1);
    });
    it('returns null if nothing is found to delete', () => {
      expect(list.delete('!')).to.equal(null);
    });
  });

  describe('#toArray', () => {
    it('returns an array that represents the list', () => {
      expect(list.toArray()).to.eql(['a', 'b', 'c']);
    });
    it('returns an empty array for an empty list', () => {
      const emptyList = new LinkedList();
      expect(emptyList.toArray()).to.eql([]);
    });
  });
});
