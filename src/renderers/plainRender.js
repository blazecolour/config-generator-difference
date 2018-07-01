import _ from 'lodash';

const isComplexValue = node =>
  (_.isObject(node) ? 'complex value' : `'${node}'`);

const plainRender = (initialKey, ast) =>
  ast.map((item) => {
    const { key, typeNode, node } = item;
    const handlers = {
      children: (astKey, astNode) => plainRender(astKey, astNode),
      initial: () => '',
      changed: (astKey, astNode) =>
        `Property '${astKey}' was updated. From ${isComplexValue(astNode.beforeValue)} to ${isComplexValue(astNode.afterValue)}`,
      added: (astKey, astNode) =>
        `Property '${astKey}' was added with ${
          isComplexValue(astNode.afterValue) === 'complex value'
            ? isComplexValue(astNode.afterValue)
            : `value: ${isComplexValue(astNode.afterValue)}`
        }`,
      deleted: astKey => `Property '${astKey}' was removed`,
    };
    const handler = handlers[typeNode];
    const finalKey = initialKey ? `${initialKey}.${key}` : key;
    return handler(finalKey, node);
  })
    .filter(e => e)
    .join('\n');

export default ast => plainRender('', ast);
