import { expect } from 'chai';
import BinarySearchTreeNode from './';

describe('BinarySearchTreeNode', () => {
  let key;
  let value;
  let node;
  beforeEach(() => {
    key = 1;
    value = '√';
    node = new BinarySearchTreeNode(key, value);
  });
  it('has a key', () => {
    expect(node).to.have.property('key', key);
  });
  it('can have a value', () => {
    expect(node).to.have.property('value', value);
  });
  it('can have a parent node', () => {
    expect(node).to.have.property('parent', null);
  });
  it('can have a left node', () => {
    expect(node).to.have.property('left', null);
  });
  it('can have a right node', () => {
    expect(node).to.have.property('right', null);
  });
});
