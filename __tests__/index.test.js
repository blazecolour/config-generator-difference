import fs from 'fs';
import genDiff from '../src';

describe('difference files', () => {
  it('tree', () => {
    const actual = genDiff(
      '__tests__/__fixtures__/before.json',
      '__tests__/__fixtures__/after.json',
      'diff',
    );
    const expected = fs.readFileSync('__tests__/__fixtures__/treeDiff', 'utf8');
    expect(actual).toBe(expected);
  });

  it('plain', () => {
    const actual = genDiff(
      '__tests__/__fixtures__/before.json',
      '__tests__/__fixtures__/after.json',
      'plain',
    );
    const expected = fs.readFileSync('__tests__/__fixtures__/plainDiff', 'utf8');
    expect(actual).toBe(expected);
  });
});
