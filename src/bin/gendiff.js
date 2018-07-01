#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .version('1.1.5', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format: diff, plain', 'diff')
  .arguments('<firstConfig> <secondConfig>')
  .action((before, after) =>
    console.log(genDiff(before, after, program.format)))
  .parse(process.argv);
