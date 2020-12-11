const fs = require("fs")
const path = require("path")

const inputs = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim()
  .split("\n")
  .map(Number)
  .sort((a, b) => a - b)
const fullEntries = [0].concat(inputs, inputs[inputs.length - 1] + 3)

console.log({ fullEntries })
// return

const part1 = (entries) => {
  let differenceMap = new Map()

  for (let i = 1; i < entries.length; i++) {
    const difference = entries[i] - entries[i - 1]
    if (!differenceMap.has(difference)) {
      differenceMap.set(difference, 1)
    } else {
      differenceMap.set(difference, differenceMap.get(difference) + 1)
    }
  }

  return differenceMap.get(1) * differenceMap.get(3)
}

const part2 = (entries) => {
  for (let i = 1; i < entries.length; i++) {
    const difference = entries[i] - entries[i - 1]
    console.log(difference)
  }
}

// console.log("part 1", part1(fullEntries))
console.log("part 2", part2(fullEntries))
