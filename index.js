const db = require('./db.js')
const inquirer = require('inquirer')

// 面向接口编程
module.exports.add = async (title) => {
    // 读取之前的任务
    const list = await db.read()
    // 往里面添加任务
    list.push({ title, done: false })
    // 保存文件
    await db.write(list)
}

module.exports.clear = async () => {
    await db.write([])
}

module.exports.showAll = async () => {
    // 读取之前的任务
    const list = await db.read()
    // 打印之前的任务
    inquirer
        .prompt({
            type: 'list',
            name: 'index',
            message: '请选择你想要操作的任务',
            choices: [{ name: '退出', value: '-1' }, { name: '+ 创建任务', value: '-2' }].concat(list.map((task, index) => {
                return { name: `${task.done ? '[x]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString() }
            }))
        })
        .then(answer => {
            const index = parseInt(answer.index)
            if (index >= 0) {
                // 选中了一个任务
                inquirer
                    .prompt({
                        type: 'list',
                        name: 'action',
                        message: '请选择操作',
                        choices: [
                            { name: '退出', value: 'quit' },
                            { name: '已完成', value: 'markAsDone' },
                            { name: '未完成', value: 'markAsUndone' },
                            { name: '改标题', value: 'updateTitle' },
                            { name: '删除', value: 'remove' }
                        ]
                    })
                    .then(answer2 => {
                        switch (answer2.action) {
                            case 'markAsDone':
                                list[index].done = true
                                db.write(list)
                                break
                            case 'markAsUndone':
                                list[index].done = false
                                db.write(list)
                                break
                            case 'updateTitle':
                                inquirer.prompt({
                                    type: 'input',
                                    name: 'title',
                                    message: '新的标题',
                                    default: list[index].title
                                }).then(answer3 => {
                                    list[index].title = answer3.title
                                    db.write(list)
                                })
                                break
                            case 'remove':
                                list.splice(index, 1)
                                db.write(list)
                                break
                        }
                    })
            } else if (index === -2) {
                // 创建任务
                inquirer.prompt({
                    type: 'input',
                    name: 'title',
                    message: '请输入任务标题'
                }).then(answer => {
                    list.push({
                        title: answer.title,
                        done: false
                    })
                    db.write(list)
                })
            }
        })
}