const fs = require("fs")
const path = require("path")

const parseLine = (entry) => entry.split(" ")
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim()
  .split("\n")
  .map(parseLine)

const part1 = (entries) => {
  let visitedIndex = new Set()
  let currentIndex = 0
  let accumulator = 0

  const run = (index) => {
    if (visitedIndex.has(index)) {
      console.log({ accumulator })
      return
    }

    visitedIndex.add(index)

    let [cmd, value] = entries[index]
    switch (cmd) {
      case "nop":
        currentIndex = index + 1
        run(currentIndex)
        break
      case "acc":
        let accAmount = parseInt(value.substr(1))
        if (value.indexOf("+") === 0) {
          accumulator += accAmount
        } else {
          accumulator -= accAmount
        }
        currentIndex = index + 1
        run(currentIndex)
        break
      case "jmp":
        let jumpAmount = parseInt(value.substr(1))
        if (value.indexOf("+") === 0) {
          currentIndex += jumpAmount
        } else {
          currentIndex -= jumpAmount
        }
        run(currentIndex)
        break
      default:
        break
    }
  }

  run(currentIndex)
}

const part2 = (originalEntries) => {
  let entries = [...originalEntries]

  const hasLoop = (commands) => {
    let visitedIndex = new Set()
    let currentIndex = 0
    let accumulator = 0
    const run = (index) => {
      if (visitedIndex.has(index)) {
        console.log("loop:", { accumulator })
        return true
      }

      if (currentIndex === commands.length) {
        console.log("no loop", { accumulator })
        return false
      }

      visitedIndex.add(index)

      let [cmd, value] = commands[index]
      switch (cmd) {
        case "nop":
          currentIndex = index + 1
          return run(currentIndex)
        case "acc":
          let accAmount = parseInt(value.substr(1))
          if (value.indexOf("+") === 0) {
            accumulator += accAmount
          } else {
            accumulator -= accAmount
          }
          currentIndex = index + 1
          return run(currentIndex)
        case "jmp":
          let jumpAmount = parseInt(value.substr(1))
          if (value.indexOf("+") === 0) {
            currentIndex += jumpAmount
          } else {
            currentIndex -= jumpAmount
          }
          return run(currentIndex)
      }
    }

    return run(currentIndex)
  }

  for (let i = 0; i < entries.length; i++) {
    let [cmd, value] = entries[i]
    if (cmd === "nop" || cmd === "jmp") {
      let newEntries = [...entries]
      if (cmd === "nop") {
        newEntries[i] = ["jmp", value]
      } else {
        newEntries[i] = ["nop", value]
      }
      if (!hasLoop(newEntries)) {
        return
      }
    }
  }
}

part1(input)
part2(input)
