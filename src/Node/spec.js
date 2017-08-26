import { expect } from 'chai'
import Node from './index'

describe('Node', () => {
  let node
  beforeEach(() => {
    node = new Node(true)
  })
  it('can take a data', () => {
    expect(node).to.have.property('data', true)
  })
  it('has a next node', () => {
    expect(node).to.have.property('next', null)
  })
})
