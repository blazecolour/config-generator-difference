#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .version('0.1.5', '-v, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format[type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((after, before, options) => {
    const diff = genDiff(before, after, options.format);
    console.log(diff);
  });

program.parse(process.argv);
