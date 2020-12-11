const fs = require("fs")
const path = require("path")

const inputs = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""))

const part1 = (originalEntries) => {
  let finished = true
  const entries = JSON.parse(JSON.stringify(originalEntries))
  for (let i = 0; i < originalEntries.length; i++) {
    for (let j = 0; j < originalEntries[i].length; j++) {
      const adjacents = [
        // top left
        originalEntries[i - 1] ? originalEntries[i - 1][j - 1] : undefined,
        // top
        originalEntries[i - 1] ? originalEntries[i - 1][j] : undefined,
        // top right
        originalEntries[i - 1] ? originalEntries[i - 1][j + 1] : undefined,
        // left
        originalEntries[i][j - 1],
        // right
        originalEntries[i][j + 1],
        // bottom left
        originalEntries[i + 1] ? originalEntries[i + 1][j - 1] : undefined,
        // bottom
        originalEntries[i + 1] ? originalEntries[i + 1][j] : undefined,
        // bottom right
        originalEntries[i + 1] ? originalEntries[i + 1][j + 1] : undefined,
      ]
      const currentValue = originalEntries[i][j]
      if (currentValue === "L" && !adjacents.includes("#")) {
        finished = false
        entries[i][j] = "#"
      }
      if (
        currentValue === "#" &&
        adjacents.filter((adjacent) => adjacent === "#").length >= 4
      ) {
        finished = false
        entries[i][j] = "L"
      }
    }
  }

  if (!finished) {
    return part1(entries)
  }

  return entries
}

console.log(
  "part 1",
  part1(inputs)
    .flat()
    .filter((entry) => entry === "#").length
)
