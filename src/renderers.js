import _ from 'lodash';

const handlers = {
  children: (key, node, level, fn) =>
    `${' '.repeat(level)}${key}: {\n${fn(node, level + 4)
      .join('\n')}\n${' '.repeat(level)}}`,
  initial: (key, node, level) =>
    `${' '.repeat(level)}${key}: ${node.afterValue}`,
  changed: (key, node, level) =>
    `${' '.repeat(level - 2)}- ${key}: ${node.beforeValue}\n${' '
      .repeat(level - 2)}+ ${key}: ${node.afterValue}`,
  added: (key, node, level) =>
    `${' '.repeat(level - 2)}+ ${key}: ${node.afterValue}`,
  deleted: (key, node, level) =>
    `${' '.repeat(level - 2)}- ${key}: ${node.beforeValue}`,
};

const stringify = (node, level) => {
  const str = Object.keys(node)
    .map(key => `${' '.repeat(level + 4)}${key}: ${node[key]}`)
    .join('\n');
  return `{\n${str}\n${' '.repeat(level)}}`;
};

const correctValue = (node, level) =>
  (_.isObject(node) ? stringify(node, level) : node);

export default (ast) => {
  const iter = (tree, level) =>
    tree.reduce((acc, item) => {
      const { key, typeNode, node } = item;
      const handler = handlers[typeNode];
      if (typeNode === 'children') {
        return [...acc, handler(key, node, level, iter)];
      }
      const afterValue = correctValue(node.afterValue, level);
      const beforeValue = correctValue(node.beforeValue, level);
      return [...acc, handler(key, { beforeValue, afterValue }, level, iter)];
    }, []);
  return `{\n${_.flatten(iter(ast, 4)).join('\n')}\n}`;
};
