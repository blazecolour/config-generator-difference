import fs from 'fs';
import _ from 'lodash';

const propertyActions = [
  {
    state: 'initial',
    check: (obj1, obj2, key) =>
      _.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key],
    process: (obj1, obj2, key) => `  ${key}: ${obj1[key]}`,
  },
  {
    state: 'change',
    check: (obj1, obj2, key) =>
      _.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key],
    process: (obj1, obj2, key) =>
      `+ ${key}: ${obj2[key]}\n- ${key}: ${obj1[key]}`,
  },
  {
    state: 'add',
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (obj1, obj2, key) => `+ ${key}: ${obj2[key]}`,
  },
  {
    state: 'delete',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: (obj1, obj2, key) => `- ${key}: ${obj1[key]}`,
  },
];

const genDiff = (file1, file2) => {
  const obj1 = JSON.parse(fs.readFileSync(file1));
  const obj2 = JSON.parse(fs.readFileSync(file2));
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const getPropertyActions = key =>
    _.find(propertyActions, ({ check }) => check(obj1, obj2, key));
  const result = keys.reduce((acc, key) => {
    const build = getPropertyActions(key).process;
    return [...acc, build(obj1, obj2, key)];
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
