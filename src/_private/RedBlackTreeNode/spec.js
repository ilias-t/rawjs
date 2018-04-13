import { expect } from 'chai';

import RedBlackTreeNode, { ColorEnums } from './';

describe('RedBlackTreeNode', () => {
  let value;
  let node;
  beforeEach(() => {
    value = '√';
    node = new RedBlackTreeNode(value);
  });
  it('has a color', () => {
    expect(node).to.have.own.property('color');
  });
  it('defaults color to black', () => {
    expect(node).to.have.own.property('color', ColorEnums.BLACK);
  });
  it('allows for "nil" nodes');
});
