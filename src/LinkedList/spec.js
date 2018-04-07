import { expect } from 'chai';
import LinkedList from './index';

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

  // describe('#search', () => {
  //   it('return the position of the node with data matching', () => {
  //     expect(list.search('a')).to.equal(0);
  //     expect(list.search('b')).to.equal(1);
  //   });
  //   it('returns null if nothing is found', () => {
  //     expect(list.search('!')).to.equal(null);
  //   });
  // });

  describe('#searchAt', () => {
    it('returns the data contained at a specified position in the list', () => {
      expect(list.searchAt(0)).to.equal('a');
      expect(list.searchAt(1)).to.equal('b');
    });
  });

  describe('#insert', () => {
    it('inserts a node at the end of the list', () => {
      list.insert('Ω');
      expect(list.searchAt(list.length - 1)).to.equal('Ω');
    });
    it('returns itself to allow for method chaining', () => {
      expect(list.insert('d')).to.equal(list);
    });
  });

  // describe('#insertFirst', () => {
  //   it('inserts a node at the beginning of the list', () => {
  //     list.insert('α');
  //     expect(list.searchAt(0)).to.equal('α');
  //   });
  //   it('returns itself to allow for method chaining', () => {
  //     expect(list.insertFirst('α')).to.equal(list);
  //   });
  // });

  // describe('#delete', () => {
  //   it('removes a specified element from the list & returns it', () => {
  //     const listLength = list.length;
  //     expect(list.delete('a')).to.equal('a');
  //     expect(list.length).to.equal(listLength - 1);
  //   });
  //   it('returns null if nothing is found to delete', () => {
  //     expect(list.delete('!')).to.equal(null);
  //   });
  //   it('returns itself to allow for method chaining', () => {
  //     expect(list.delete('!')).to.equal(list);
  //   });
  // });

  // describe('#toArray', () => {
  //   it('returns an array that represents the list', () => {
  //     expect(list.toArray()).to.equal(['a', 'b', 'c']);
  //   });
  // });
});
