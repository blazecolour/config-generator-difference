import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import buildAst from './ast';
import render from './renderers';

const genDiff = (file1, file2) => {
  const data1 = fs.readFileSync(file1, 'utf8');
  const data2 = fs.readFileSync(file2, 'utf8');
  const fileExt = path.extname(file1).slice(1);
  const obj1 = parsers[fileExt](data1);
  const obj2 = parsers[fileExt](data2);
  const ast = buildAst(obj1, obj2);
  return render(ast);
};

export default genDiff;
