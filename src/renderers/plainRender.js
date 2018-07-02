import _ from 'lodash';

const isComplexValue = node =>
  (_.isObject(node) ? 'complex value' : `'${node}'`);

const plainRender = (initialKey, ast) =>
  ast
    .map((item) => {
      const { key, typeNode, children } = item;
      const handlers = {
        nested: (astKey, astNode) => plainRender(astKey, astNode),
        unchanged: () => '',
        changed: (astKey, astNode) =>
          `Property '${astKey}' was updated. From ${isComplexValue(astNode.before)} to ${isComplexValue(astNode.after)}`,
        added: (astKey, astNode) =>
          `Property '${astKey}' was added with ${
            isComplexValue(astNode.after) === 'complex value'
              ? isComplexValue(astNode.after)
              : `value: ${isComplexValue(astNode.after)}`
          }`,
        deleted: astKey => `Property '${astKey}' was removed`,
      };
      const handler = handlers[typeNode];
      const finalKey = initialKey ? `${initialKey}.${key}` : key;
      return handler(finalKey, children);
    })
    .filter(e => e)
    .join('\n');

export default ast => plainRender('', ast);
