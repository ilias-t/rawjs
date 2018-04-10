import { expect } from 'chai';
import { Node } from '../';

describe('Node', () => {
  let value;
  let node;
  beforeEach(() => {
    value = '√';
    node = new Node(value);
  });
  it('can have a value', () => {
    expect(node).to.have.property('value', value);
  });
  it('can have a next node', () => {
    expect(node).to.have.property('next', null);
  });
});
