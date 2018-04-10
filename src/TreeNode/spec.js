import { expect } from 'chai';
import { TreeNode } from '../';

describe('TreeNode', () => {
  let value;
  let node;
  beforeEach(() => {
    value = '√';
    node = new TreeNode(value);
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
