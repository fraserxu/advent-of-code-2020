const fs = require('fs')
const fsPromises = fs.promises

const validateEntry = (entry) => {
  const [range, character, word] = entry.split(' ')
  const [start, end] = range.split('-')
  const char = character.charAt(0)
  return (word.charAt(start - 1) === char && word.charAt(end - 1) !== char) || (word.charAt(start - 1) !== char && word.charAt(end - 1) === char)
}

const main = async () => {
  try {
    const input = await fsPromises.readFile('./input.txt', 'utf8')
    const validEntries = input.trim().split('\n')
      .filter(validateEntry)
    console.log(validEntries.length)
  } catch (error) {
    console.error(error)
  }
}

main()
