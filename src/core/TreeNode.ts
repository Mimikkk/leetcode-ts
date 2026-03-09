export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }

  static fromArray(array: (number | null)[]): TreeNode | null {
    if (array.length === 0) return null;

    const root = new TreeNode(array[0] ?? 0);
    const queue: TreeNode[] = [root];
    let i = 1;

    while (i < array.length && queue.length > 0) {
      const node = queue.shift();

      if (node) {
        if (i < array.length) {
          node.left = array[i] !== null ? new TreeNode(array[i] ?? 0) : null;
          if (node.left) queue.push(node.left);
          ++i;
        }

        if (i < array.length) {
          node.right = array[i] !== null ? new TreeNode(array[i] ?? 0) : null;
          if (node.right) queue.push(node.right);
          ++i;
        }
      }
    }

    return root;
  }

  toArrayPreorder(): number[] {
    const result: number[] = [];
    const queue: TreeNode[] = [this];

    while (queue.length > 0) {
      const node = queue.shift();

      if (node) {
        result.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }

    return result;
  }
}
