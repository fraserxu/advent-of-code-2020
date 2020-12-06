const fs = require("fs")
const path = require("path")

const fsPromises = fs.promises

const parseEntry = (entry) => {
  let rows = entry.substr(0, 7)
  let columns = entry.substr(7)
  let [rstart, rend] = [0, 127]
  let [cstart, cend] = [0, 7]

  for (let row of rows) {
    let middle = rstart + Math.floor((rend - rstart) / 2)
    if (row === "F") {
      rend = middle
    } else {
      rstart = middle + 1
    }
  }

  for (let column of columns) {
    let middle = cstart + Math.floor((cend - cstart) / 2)
    if (column === "L") {
      cend = middle
    } else {
      cstart = middle + 1
    }
  }

  let row = rstart
  let column = cstart
  return row * 8 + column
}

const main = async () => {
  try {
    const input = await fsPromises.readFile(
      path.resolve(__dirname, "./input.txt"),
      "utf8"
    )
    const [min, max] = [8, 126 * 8]
    const allEntries = input.trim().split("\n").map(parseEntry)
    let remaining = []
    for (let i = min; i < max; i++) {
      if (!allEntries.includes(i)) {
        remaining.push(i)
      }
    }
    console.log(remaining)
    // console.log("highest entry", Math.max(...allEntries))
  } catch (error) {
    console.error(error)
  }
}

main()
