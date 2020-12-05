const fs = require("fs")
const path = require("path")

const fsPromises = fs.promises

const fields = {
  byr: (value) => {
    if (!value) return false
    return /^\d{4}$/.test(value) && value >= 1920 && value <= 2002
  },
  iyr: (value) => {
    if (!value) return false
    return /^\d{4}$/.test(value) && value >= 2010 && value <= 2020
  },
  eyr: (value) => {
    if (!value) return false
    return /^\d{4}$/.test(value) && value >= 2020 && value <= 2030
  },
  hgt: (value) => {
    if (!value) return false
    return /^(15[0-9]|1[6-8][0-9]|19[0-3])cm|^(59|6[0-9]|7[0-6])in$/.test(value)
  },
  hcl: (value) => {
    if (!value) return false
    return /^#[0-9a-f]{6}$/.test(value)
  },
  ecl: (value) => {
    if (!value) return false
    const validOptions = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
    return validOptions.includes(value)
  },
  pid: (value) => {
    if (!value) return false
    return /^\d{9}$/.test(value)
  },
  cid: () => {
    return true
  },
}

const parseEntry = (str) => {
  return str
    .replace(/\n/g, " ")
    .split(" ")
    .reduce((acc, current) => {
      const [key, value] = current.split(":")
      acc[key] = value
      return acc
    }, {})
}

const validateEntry = (entry) => {
  return Object.keys(fields).every((key) => {
    return fields[key](entry[key])
  })
}

const main = async () => {
  try {
    const input = await fsPromises.readFile(
      path.resolve(__dirname, "./input.txt"),
      "utf8"
    )
    const allEntries = input.trim().split("\n\n").map(parseEntry)

    const validEntries = allEntries.filter(validateEntry)
    console.log("all entries", allEntries.length)
    console.log("valid entries:", validEntries.length)
  } catch (error) {
    console.error(error)
  }
}

main()
