import _ from 'lodash';

const stringify = (node, level) => {
  const str = Object.keys(node)
    .map(key => `${' '.repeat(level + 4)}${key}: ${node[key]}`)
    .join('\n');
  return `{\n${str}\n${' '.repeat(level)}}`;
};

const correctValue = (node, level) =>
  _.isObject(node) ? stringify(node, level) : node;

const diffRender = (ast, level) => {
  return ast.map(item => {
    const { key, typeNode, node } = item;

    const handlers = {
      children: node =>
        `${' '.repeat(level)}${key}: {\n${diffRender(node, level + 4).join(
          '\n'
        )}\n${' '.repeat(level)}}`,
      initial: node =>
        `${' '.repeat(level)}${key}: ${correctValue(node.afterValue, level)}`,
      changed: node =>
        `${' '.repeat(level - 2)}- ${key}: ${correctValue(
          node.beforeValue,
          level
        )}\n${' '.repeat(level - 2)}+ ${key}: ${correctValue(
          node.afterValue,
          level
        )}`,
      added: node =>
        `${' '.repeat(level - 2)}+ ${key}: ${correctValue(
          node.afterValue,
          level
        )}`,
      deleted: node =>
        `${' '.repeat(level - 2)}- ${key}: ${correctValue(
          node.beforeValue,
          level
        )}`
    };
    const handler = handlers[typeNode];
    return handler(node);
  });
};
export default ast => `{\n${_.flatten(diffRender(ast, 4)).join('\n')}\n}`;
