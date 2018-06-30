import fs from 'fs';
import genDiff from '../src';

describe('difference JSON files', () => {
  it('json', () => {
    const actual = genDiff(
      '__tests__/__fixtures__/before.json',
      '__tests__/__fixtures__/after.json',
    );
    const expected = fs.readFileSync('__tests__/__fixtures__/treeDiff', 'utf8');
    expect(actual).toBe(expected);
  });
});

describe('difference yaml files', () => {
  it('yml', () => {
    const actual = genDiff(
      '__tests__/__fixtures__/before.yml',
      '__tests__/__fixtures__/after.yml',
    );
    const expected = fs.readFileSync('__tests__/__fixtures__/treeDiff', 'utf8');
    expect(actual).toBe(expected);
  });
});

describe('difference ini files', () => {
  it('ini', () => {
    const actual = genDiff(
      '__tests__/__fixtures__/before.ini',
      '__tests__/__fixtures__/after.ini',
    );
    const expected = fs.readFileSync('__tests__/__fixtures__/treeDiff', 'utf8');
    expect(actual).toBe(expected);
  });
});
