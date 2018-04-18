/*
 * RedBlackTreeNode
 * @flow
 */

type TRed = 0;
type TBlack = 1;

export const ColorEnums: { RED: TRed, BLACK: TBlack } = {
  RED: 0,
  BLACK: 1,
};

class RedBlackTreeNode {
  key: number | null;
  value: any;
  color: TRed | TBlack;
  parent: ?RedBlackTreeNode;
  left: ?RedBlackTreeNode;
  right: ?RedBlackTreeNode;
  constructor(
    // Key can be null to allow for "nil" nodes
    key: number | null = null,
    value: any
  ) {
    this.key = key;
    this.value = value;
    this.color = ColorEnums.BLACK;
  }
}

export default RedBlackTreeNode;
