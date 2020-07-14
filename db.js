const home = require('os').homedir()
const realHome = process.env.HOME || home
const path = require('path')
const fs = require('fs')
const dbPath = path.join(realHome, '.todo')

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: 'a+' }, (error, data) => {
                if (error)
                    return reject(error)

                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (error2) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(dbPath, string + '\n', (error) => {
                if (error)
                    return reject(error)

                resolve()
            })
        })
    }
}

module.exports = db