const program = require('commander')
const api = require('./index.js')

program
    .option('-x, --xxx', 'what is the x')

program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args[0].args.join(' ')
        api.add(words)
    })

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear()
    })


program.parse(process.argv)

console.log(process.argv)