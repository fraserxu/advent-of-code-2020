const fs = require('fs')
const path = require('path')

const fsPromises = fs.promises

const fields = {
  byr: 'required',
  iyr: 'required',
  eyr: 'required',
  hgt: 'required',
  hcl: 'required',
  ecl: 'required',
  pid: 'required',
  cid: 'optional',
}

const parseEntry = str => {
  return str.replace(/\n/g, ' ').split(' ').reduce((acc, current) => {
    const [key, value] = current.split(':')
    acc[key] = value
    return acc
  }, {})
}

const inValidEntry = entry => {
  return Object.keys(fields).some(key => {
    return fields[key] === 'required' && !entry[key]
  })
}

const main = async () => {
  try {
    const input = await fsPromises.readFile(path.resolve(__dirname, './input.txt'), 'utf8')
    const inValidEntries = input.trim().split('\n\n')
      .map(parseEntry)
      .filter(inValidEntry)
    console.log('inValidEntries:', inValidEntries.length)
  } catch (error) {
    console.error(error)
  }
}

main()
