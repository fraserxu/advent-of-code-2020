const fs = require('fs')
const fsPromises = fs.promises

const validateEntry = (entry) => {
  const [range, character, word] = entry.split(' ')
  const [min, max] = range.split('-')
  const char = character.charAt(0)
  const charCount = word.split('').filter(c => c === char).length
  return charCount >= min && charCount <= max
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
