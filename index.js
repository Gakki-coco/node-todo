const home = require('os').homedir()
const realHome = process.env.HOME || home
const path = require('path')
const fs = require('fs')
const dbPath = path.join(realHome, '.todo')

module.exports.add = (title) => {
    // 读取之前的任务
    fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            let list
            try {
                list = JSON.parse(data.toString())
            } catch (error2) {
                list = []
            }

            // 往里面添加任务
            const task = {
                title: title,
                done: false
            }
            list.push(task)
            // 保存文件
            const string = JSON.stringify(list)
            fs.writeFile(dbPath, string + '\n', (error3) => {
                if (error3) {
                    console.log(error3)
                }
            })
        }

    })
}