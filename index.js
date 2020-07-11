const program = require('commander')

program
    .option('-x, --xxx', 'what is the x')

program
    .command('add')
    .description('add a task')
    .action((...args)=> {
        const words = args.slice(-1)[0].join(' ')
        console.log(words)
    })

program
    .command('clear')
    .description('clear all tasks')
    .action((...args) => {

    })


program.parse(process.argv)