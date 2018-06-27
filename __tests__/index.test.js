import genDiff from '../src';

describe('difference files', () => {
  it('files from task', () => {
    const actual = genDiff(
      '__tests__/__fixtures__/before.json',
      '__tests__/__fixtures__/after.json'
    );
    const expected = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;
    expect(actual).toBe(expected);
  });
});
