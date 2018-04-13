import { expect } from 'chai';
import LinkedListNode from './';

describe('LinkedListNode', () => {
  let value;
  let node;
  beforeEach(() => {
    value = '√';
    node = new LinkedListNode(value);
  });
  it('can have a value', () => {
    expect(node).to.have.property('value', value);
  });
  it('can have a next node', () => {
    expect(node).to.have.property('next', null);
  });
});
