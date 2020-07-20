#!/usr/bin/env node
const program = require('commander')
const api = require('./index.js')

program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args[0].args.join(' ')
        api.add(words).then(() => { console.log('添加成功') }, () => { console.log('添加失败') })
    })

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear().then(() => { console.log('清除成功') }, () => { console.log('清除失败') })
    })

if (process.argv.length === 2) {
    // 说明用户直接运行 node cli.js
    api.showAll()
    return
}

program.parse(process.argv)
