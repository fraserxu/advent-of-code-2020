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

let currentAngle = 0
let currentDirectionMap = {
  0: "E",
  90: "S",
  180: "W",
  270: "N",
  360: "E",
}

const getDirectionByAngle = (angle) => {
  if (angle === 0) return "E"
  if (angle < 0) {
    if (angle < -360) {
      angle = angle % 360
    }
    return currentDirectionMap[360 + angle]
  } else {
    if (angle > 360) {
      angle = angle % 360
    }
    return currentDirectionMap[angle]
  }
}

for (let [direction, value] of inputs) {
  switch (direction) {
    case "N":
      y += value
      break
    case "S":
      y -= value
      break
    case "E":
      x += value
      break
    case "W":
      x -= value
      break
    case "L":
      currentAngle -= value
      break
    case "R":
      currentAngle += value
      break
    case "F":
      switch (getDirectionByAngle(currentAngle)) {
        case "N":
          y += value
          break
        case "S":
          y -= value
          break
        case "E":
          x += value
          break
        case "W":
          x -= value
          break
      }
      break
  }
}

console.log("part 1", [x, y], Math.abs(x) + Math.abs(y))
