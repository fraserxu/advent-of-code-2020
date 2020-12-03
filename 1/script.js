const fs = require('fs')
const fsPromises = fs.promises

const main = async () => {
  try {
    const input = await fsPromises.readFile('./input.txt', 'utf8')
    const entries = input.trim().split('\n')
      .map(entry => parseInt(entry))
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        if (entries[i] + entries[j] === 2020) {
          console.log(entries[i], entries[j], entries[i] * entries[j])
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

main()
