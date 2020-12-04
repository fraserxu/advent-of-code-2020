const fs = require('fs')
const path = require('path')

const fsPromises = fs.promises

const getTreeCounts = (entries, slope) => {
  const currentColumns = entries[0].length
  const totalRows = entries.length

  const columnsNeeded = totalRows / slope.down * slope.right + 1
  const repeat = Math.ceil(columnsNeeded / currentColumns)

  const matrix = entries.map(row => {
    let newRow = row
    for (let i = 0; i < repeat; i ++) {
      newRow += row
    }
    return newRow.split('')
  })

  let counter = 0
  if (slope.right >= slope.down) {
    for (let j = 0; j < totalRows; j += slope.down) {
      if (matrix[j][j * slope.right ] === '#') counter += 1
    }
  } else {
    for (let j = 0; j < totalRows; j += slope.down) {
      if (matrix[j][j / slope.down ] === '#') counter += 1
    }
  }

  console.log({repeat, counter})
  return counter
}

const main = async () => {
  try {
    const input = await fsPromises.readFile(path.resolve(__dirname, './input.txt'), 'utf8')
    const entries = input.trim().split('\n')
    const slopes = [
      {
        right: 1, down: 1
      },
      {
        right: 3, down: 1
      },
      {
        right: 5, down: 1
      },
      {
        right: 7, down: 1
      },
      {
        right: 1, down: 2
      }
    ]

    const counters = slopes.map((slope => getTreeCounts(entries, slope)))

    const results = counters.reduce((acc, current) => {
      return acc * current
    }, 1)
    console.log({results})
  } catch (error) {
    console.error(error)
  }
}

main()
