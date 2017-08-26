import { expect } from 'chai'
import SinglyLinkedList from './index'

describe('SinglyLinkedList', () => {
  let list
  beforeEach(() => {
    list = new SinglyLinkedList(['a', 'b', 'c', 'd', 'e'])
  })

  describe('length', () => {
    it('returns the number of nodes in the list', () => {
      const emptyList = new SinglyLinkedList()
      expect(emptyList.length).to.equal(0)
      expect(list.length).to.equal(5)
    })
  })

  describe('#search', () => {
    it('return the position of the node with data matching', () => {
      expect(list.search('a')).to.equal(0)
      expect(list.search('b')).to.equal(1)
    })
    it('returns null if nothing is found', () => {
      expect(list.search('!')).to.equal(null)
    })
  })

  describe('#searchAt', () => {
    it('returns the data contained at a specified position in the list', () => {
      expect(list.searchAt(0)).to.equal('a')
      expect(list.searchAt(1)).to.equal('b')
    })
  })

  describe('#insert', () => {
    it('inserts a node at the end of the list', () => {
      list.insert('Ω')
      expect(list.searchAt(list.lenght - 1)).to.equal('Ω')
    })
  })

  describe('#insertFirst', () => {
    it('inserts a node at the beginning of the list', () => {
      list.insert('α')
      expect(list.searchAt(0)).to.equal('α')
    })
  })

  describe('#delete', () => {
    it('removes a specified element from the list & returns it', () => {
      const listLength = list.length
      expect(list.delete('a')).to.equal('a')
      expect(list.length).to.equal(listLength - 1)
    })
    it('returns null if nothing is found to delete', () => {
      expect(list.delete('!')).to.equal(null)
    })
  })
})
