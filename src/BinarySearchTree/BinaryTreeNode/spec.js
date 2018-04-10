import { expect } from 'chai';
import BinaryTreeNode from './';

describe('BinaryTreeNode', () => {
  let value;
  let node;
  beforeEach(() => {
    value = '√';
    node = new BinaryTreeNode(value);
  });
  it('has a value', () => {
    expect(node).to.have.property('value', value);
  });
  it('can have a left node', () => {
    expect(node).to.have.property('left', null);
  });
  it('can have a right node', () => {
    expect(node).to.have.property('right', null);
  });
});
