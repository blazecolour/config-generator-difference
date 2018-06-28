import fs from 'fs';
import genDiff from '../src';

describe('difference files', () => {
  it('files from task', () => {
    const actual = genDiff(
      '__tests__/__fixtures__/before.json',
      '__tests__/__fixtures__/after.json',
    );
    const expected = fs.readFileSync('./__tests__/__fixtures__/jsonDiff', 'utf8');
    expect(actual).toBe(expected);
  });
});
