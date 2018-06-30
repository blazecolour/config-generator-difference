import _ from 'lodash';

const handlers = {
  embedded: (key, value, spaces, func) =>
    `${' '.repeat(spaces)}${key}: {\n${func(value, spaces + 4)
      .join('\n')}\n${' '.repeat(spaces)}}`,
  initial: (key, value, spaces) =>
    `${' '.repeat(spaces)}${key}: ${value.afterValue}`,
  changed: (key, value, spaces) =>
    `${' '.repeat(spaces - 2)}- ${key}: ${value.beforeValue}\n${' '
      .repeat(spaces - 2)}+ ${key}: ${value.afterValue}`,
  added: (key, value, spaces) =>
    `${' '.repeat(spaces - 2)}+ ${key}: ${value.afterValue}`,
  deleted: (key, value, spaces) =>
    `${' '.repeat(spaces - 2)}- ${key}: ${value.beforeValue}`,
};

const stringify = (value, spaces) => {
  const str = Object.keys(value)
    .map(key => `${' '.repeat(spaces + 4)}${key}: ${value[key]}`)
    .join('\n');
  return `{\n${str}\n${' '.repeat(spaces)}}`;
};

const correctValue = (value, spaces) =>
  (_.isObject(value) ? stringify(value, spaces) : value);

export default (ast) => {
  const iter = (tree, spaces) =>
    tree.reduce((acc, item) => {
      const { typeNode, key, value } = item;
      const handler = handlers[typeNode];
      if (typeNode === 'embedded') {
        return [...acc, handler(key, value, spaces, iter)];
      }
      const afterValue = correctValue(value.afterValue, spaces);
      const beforeValue = correctValue(value.beforeValue, spaces);
      return [...acc, handler(key, { beforeValue, afterValue }, spaces, iter)];
    }, []);
  return `{\n${_.flatten(iter(ast, 4)).join('\n')}\n}`;
};
