import { expect } from 'chai';
import { Node } from '../';

describe('Node', () => {
  let node;
  beforeEach(() => {
    node = new Node(true);
  });
  it('can take a data', () => {
    expect(node).to.have.property('value', true);
  });
  it('has a next node', () => {
    expect(node).to.have.property('next', null);
  });
});
