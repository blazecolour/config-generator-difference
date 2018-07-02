import _ from 'lodash';

const stringify = (node, level) => {
  const str = Object.keys(node)
    .map(key => `${' '.repeat(level + 4)}${key}: ${node[key]}`)
    .join('\n');
  return `{\n${str}\n${' '.repeat(level)}}`;
};

const correctValue = (node, level) =>
  (_.isObject(node) ? stringify(node, level) : node);

const diffRender = (ast, level) =>
  ast.map((item) => {
    const { key, typeNode, children } = item;

    const handlers = {
      nested: node =>
        `${' '.repeat(level)}${key}: {\n${diffRender(node, level + 4)
          .join('\n')}\n${' '.repeat(level)}}`,
      unchanged: node =>
        `${' '.repeat(level)}${key}: ${correctValue(node.after, level)}`,
      changed: node =>
        `${' '.repeat(level - 2)}- ${key}: ${correctValue(
          node.before,
          level,
        )}\n${' '.repeat(level - 2)}+ ${key}: ${correctValue(node.after, level)}`,
      added: node =>
        `${' '.repeat(level - 2)}+ ${key}: ${correctValue(node.after, level)}`,
      deleted: node =>
        `${' '.repeat(level - 2)}- ${key}: ${correctValue(node.before, level)}`,
    };
    const handler = handlers[typeNode];
    return handler(children);
  });

export default ast => `{\n${_.flatten(diffRender(ast, 4)).join('\n')}\n}`;
