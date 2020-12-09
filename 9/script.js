const fs = require("fs")
const path = require("path")

const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim()
  .split("\n")
  .map(Number)

const preamble = 25
const sum = (array) => array.reduce((acc, curr) => acc + curr, 0)

const part1 = (entries) => {
  const currentIndex = preamble
  for (let i = currentIndex; i < entries.length; i++) {
    const items = entries.slice(i - preamble, i)
    const currentValue = entries[i]
    let currentValueValid = false
    for (let x = 0; x < items.length; x++) {
      for (let y = x + 1; y < items.length; y++) {
        if (items[x] + items[y] === currentValue) {
          currentValueValid = true
        }
      }
    }

    if (!currentValueValid) {
      return entries[i]
    }
  }
}

const invalidSum = part1(input)
console.log("part 1: invalid value is ", invalidSum)

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    const items = input.slice(i, j)
    if (sum(items) === invalidSum && items.length > 1) {
      const min = Math.min(...items)
      const max = Math.max(...items)
      console.log("part 2: invalid value is", { min, max }, min + max)
    }
  }
}
