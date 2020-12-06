const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"),
"utf8")

const part1 = (input) => {
  return input.trim().split("\n\n")
  .map(entry => {
    return entry.replace(/\n/g, '').split('')
      .reduce((accmulator, current) => {
        accmulator.add(current)
        return accmulator
      }, new Set()).size
  })
  .reduce((accumulator, current) => {
    return accumulator + current
  }, 0)
}

const part2 = (input) => {
  return input.trim().split("\n\n")
  .map(entry => {
    return entry.split('\n')
      .reduce((accumulator, current, index) => {
        if (index === 0) {
          current.split('').forEach(char => accumulator.add(char))
        } else {
          let currentArray = current.split('')
          for (let set of accumulator) {
            if (!currentArray.includes(set)) {
              accumulator.delete(set)
            }
          }
        }
        return accumulator
      }, new Set()).size
  })
  .reduce((accumulator, current) => {
    return accumulator + current
  }, 0)
}

console.log('part1:', part1(input))
console.log('part2:', part2(input))
