import _ from 'lodash';

const isComplexValue = node =>
  _.isObject(node) ? 'complex value' : `'${node}'`;

const plainRender = (initialKey, ast) => {
  return ast
    .map(item => {
      const { key, typeNode, node } = item;
      const handlers = {
        children: (key, node) => plainRender(key, node),
        initial: () => '',
        changed: (key, node) =>
          `Property '${key}' was updated. From ${isComplexValue(
            node.beforeValue
          )} to ${isComplexValue(node.afterValue)}`,
        added: (key, node) =>
          `Property '${key}' was added with ${
            isComplexValue(node.afterValue) === 'complex value'
              ? isComplexValue(node.afterValue)
              : `value: ${isComplexValue(node.afterValue)}`
          }`,
        deleted: key => `Property '${key}' was removed`
      };
      const handler = handlers[typeNode];
      const finalKey = initialKey ? `${initialKey}.${key}` : key;
      return handler(finalKey, node);
    })
    .filter(e => e)
    .join('\n');
};

export default ast => plainRender('', ast);
