import _ from 'lodash';

const handlers = {
  children: (key, node, fn) => fn(key, node),
  initial: () => '',
  changed: (key, afterValue, beforeValue) =>
    `Property '${key}' was updated. From ${beforeValue} to ${afterValue}`,

  added: (key, afterValue) =>
    `Property '${key}' was added with ${
      afterValue === 'complex value' ? afterValue : `value: ${afterValue}`
    }`,
  deleted: key => `Property '${key}' was removed`,
};

const isComplexValue = node =>
  (_.isObject(node) ? 'complex value' : `'${node}'`);

export default (ast) => {
  const iter = (initialKey, tree) =>
    tree
      .map((item) => {
        const { key, typeNode, node } = item;
        const handler = handlers[typeNode];
        const finalKey = initialKey ? `${initialKey}.${key}` : key;
        if (typeNode === 'children') {
          return handler(finalKey, node, iter);
        }
        const beforeValue = isComplexValue(node.beforeValue);
        const afterValue = isComplexValue(node.afterValue);
        return handler(finalKey, afterValue, beforeValue);
      })
      .filter(e => e)
      .join('\n');
  return iter('', ast);
};
