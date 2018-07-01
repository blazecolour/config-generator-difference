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
    const { key, typeNode, node } = item;

    const handlers = {
      children: astNode =>
        `${' '.repeat(level)}${key}: {\n${diffRender(astNode, level + 4)
          .join('\n')}\n${' '.repeat(level)}}`,
      initial: astNode =>
        `${' '.repeat(level)}${key}: ${correctValue(astNode.afterValue, level)}`,
      changed: astNode =>
        `${' '.repeat(level - 2)}- ${key}: ${correctValue(astNode.beforeValue, level)}\n${' '.repeat(level - 2)}+ ${key}: ${correctValue(astNode.afterValue, level)}`,
      added: astNode =>
        `${' '.repeat(level - 2)}+ ${key}: ${correctValue(astNode.afterValue, level)}`,
      deleted: astNode =>
        `${' '.repeat(level - 2)}- ${key}: ${correctValue(astNode.beforeValue, level)}`,
    };
    const handler = handlers[typeNode];
    return handler(node);
  });

export default ast => `{\n${_.flatten(diffRender(ast, 4)).join('\n')}\n}`;
