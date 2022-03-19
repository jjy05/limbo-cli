#! /usr/bin/env node

const figlet = require('figlet');
const { program } = require('commander') ;
const chalk = require('chalk');
const pkgFile = require('./../package.json');
const create = require('./lib/create.js');

// create
program
.command('create <name>')
.description('整个新活')
.option('-f, --force', '弃旧迎新')
.action((name, options) => {
  create(name, options)
});

program
.on('--help', () => {
  // 整个LOGO瞅瞅
  console.log('\r\n' + figlet.textSync('LIMBO', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  }));
  console.log(`\r\n运行 ${chalk.cyan(`limbo-cli <command> --help`)} 来了解命令都咋用的\r\n`)
});

program
.version(`v${pkgFile.version}`)
.usage('<command> [option]');

program.parse();