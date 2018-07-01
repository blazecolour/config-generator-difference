import _ from 'lodash';

const propertyActions = [
  {
    typeNode: 'children',
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])) &&
      !(Array.isArray(obj1[key]) && Array.isArray(obj2[key])),
    process: (before, after, fn) => fn(before, after),
  },

  {
    typeNode: 'initial',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] === obj2[key]),
    process: (before, after) => ({ beforeValue: before, afterValue: after }),
  },

  {
    typeNode: 'changed',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] !== obj2[key]),
    process: (before, after) => ({ beforeValue: before, afterValue: after }),
  },
  {
    typeNode: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    process: (before, after) => ({ beforeValue: before, afterValue: after }),
  },
  {
    typeNode: 'deleted',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    process: (before, after) => ({ beforeValue: before, afterValue: after }),
  },
];

const buildAst = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    const { typeNode, process } = propertyActions.find(({ check }) =>
      check(obj1, obj2, key));
    const node = process(obj1[key], obj2[key], buildAst);
    return { key, typeNode, node };
  });
};

export default buildAst;
