const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")

const parseLine = (entry) => {
  let [parent, children] = entry.split("contain")

  return {
    key: parent.split(" ").slice(0, 2).join(" "),
    values: children
      .split(",")
      .map((value) => value.trim())
      .filter((value) => /^\d/.test(value))
      .map((value) => value.split(" ").slice(1, -1).join(" ")),
  }
}

const part1 = (input) => {
  const entries = input
    .trim()
    .split("\n")
    .map(parseLine)
    .reduce((accumulator, current) => {
      let { key, values } = current
      accumulator[key] = values
      return accumulator
    }, {})

  let counter = new Set()

  const processEntry = (key, rootKey) => {
    if (entries[key] && entries[key].length > 0) {
      if (entries[key].includes("shiny gold")) {
        counter.add(rootKey || key)
        return
      }
      entries[key].forEach((value) => processEntry(value, rootKey))
    }
  }

  Object.keys(entries).forEach((key) => processEntry(key, key))

  return counter.size
}

console.log("part1:", part1(input))
