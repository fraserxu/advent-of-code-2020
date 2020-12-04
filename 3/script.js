const fs = require('fs')
const path = require('path')

const fsPromises = fs.promises

const main = async () => {
  try {
    const input = await fsPromises.readFile(path.resolve(__dirname, './input.txt'), 'utf8')
    const entries = input.trim().split('\n')
    const currentColumns = entries[0].length
    const totalRows = entries.length
    const columnsNeeded = totalRows * 3 + 1
    const repeat = Math.ceil(columnsNeeded / currentColumns)

    const matrix = entries.map(row => {
      let newRow = row
      for (let i = 0; i < repeat; i ++) {
        newRow += row
      }
      return newRow.split('')
    })

    let counter = 0
    for (let j = 0; j < totalRows; j++) {
      if (matrix[j][j*3] === '#') counter += 1
    }

    console.log('counter:', counter)
  } catch (error) {
    console.error(error)
  }
}

main()
