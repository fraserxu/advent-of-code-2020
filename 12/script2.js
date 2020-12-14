const fs = require("fs")
const path = require("path")

const inputs = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((instruction) => {
    const [direction, ...value] = instruction.split("")
    return [direction, Number(value.join(""))]
  })

let [x, y] = [0, 0]
let [m, n] = [10, 1]

const rotate = (direction, value) => {
  if (value === 180) {
    ;[m, n] = [-m, -n]
    return
  }

  if (
    (direction === "R" && value === 90) ||
    (direction === "L" && value === 270)
  ) {
    ;[m, n] = [n, -m]
  } else {
    ;[m, n] = [-n, m]
  }
}

for (let [direction, value] of inputs) {
  switch (direction) {
    case "N":
      n += value
      break
    case "S":
      n -= value
      break
    case "E":
      m += value
      break
    case "W":
      m -= value
      break
    case "L":
      rotate(direction, value)
      break
    case "R":
      rotate(direction, value)
      break
    case "F":
      x += m * value
      y += n * value
      break
  }

  console.log([x, y], [m, n])
}

console.log("part 2", [x, y], Math.abs(x) + Math.abs(y))
